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
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (error) {
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const query = url?.split("?")[1];
  const params = new URLSearchParams(query);
  const token = params.get("token") || "";

  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

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
        const user = users.find((user) => user.ws === ws);
        if (!user) return;
        user?.rooms.push(parsedData.roomId);
      }

      if (parsedData.type === "leave_room") {
        const user = users.find((x) => x.ws === ws);
        if (!user) return null;
        user.rooms = user?.rooms.filter((user) => user === parsedData.room);
      }

      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;

        if (isNaN(roomId)) {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Invalid room ID",
            }),
          );
          return;
        }
        try {
          await prisma.chat.create({
            data: {
              roomId: Number(roomId), 
              messages: message,
              userId,
            },
          });

          users.forEach((user) => {
            if (user.rooms.includes(roomId)) {
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
        } catch (dbError) {
          console.error("Database error:", dbError);
          // Optionally notify the sender
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
});
