import "dotenv/config";
import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db";
import { JWT_SECRET } from "@repo/common-backend/token";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    console.log("Verifying token...");
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      console.log("Token decoded as string, expected object");
      return null;
    }

    if (!decoded || !decoded.userId) {
      console.log("Token missing userId in payload");
      return null;
    }

    console.log("Token verified successfully for userId:", decoded.userId);
    return decoded.userId;
  } catch (error: any) {
    console.log("❌ Token verification error:", error.message);
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  console.log("New connection request, URL:", url);
  if (!url) {
    console.log("No URL found in request");
    return;
  }
  const query = url?.split("?")[1];
  const params = new URLSearchParams(query);
  const token = params.get("token") || "";

  console.log("Extracted token:", token ? "(exists)" : "(missing)");
  const userId = checkUser(token);

  if (!userId) {
    console.log("User verification failed, closing connection");
    ws.close();
    return;
  }

  console.log("User verified:", userId);
  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data);
    }
    try {
      if (parsedData.type === "join_room") {
        const user = users.find((u) => u.ws === ws);
        if (user && !user.rooms.includes(parsedData.roomId)) {
          user.rooms.push(parsedData.roomId);
        }
      }

      if (parsedData.type === "leave_room") {
        const user = users.find((u) => u.ws === ws);
        if (user) {
          user.rooms = user.rooms.filter((r) => r !== parsedData.roomId);
        }
      }

      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;

        console.log("Received chat message for room:", roomId);

        const numericRoomId = Number(roomId);
        if (isNaN(numericRoomId)) {
          console.log("Invalid Room ID received:", roomId);
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Invalid room ID",
            }),
          );
          return;
        }

        try {
          console.log("Attempting to save shape to DB for room:", numericRoomId);
          const savedChat = await prisma.chat.create({
            data: {
              roomId: numericRoomId,
              messages: message,
              userId,
            },
          });
          console.log("Shape saved successfully, ID:", savedChat.id);

          users.forEach((user) => {
            if (user.rooms.includes(roomId.toString())) {
              user.ws.send(
                JSON.stringify({
                  type: "chat",
                  messages: message,
                  roomId: parsedData.roomId,
                  userId,
                }),
              );
            }
          });
        } catch (dbError: any) {
          console.error("❌ DATABASE SAVE ERROR:", dbError.message);
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Failed to save message",
            }),
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  ws.on("close", () => {
    console.log("Connection closed for user:", userId);
    const index = users.findIndex((u) => u.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});
