import { roomSchema } from "@repo/common/schema";
import AsyncHandler from "../utils/AsyncHandler";
import ApiError from "../utils/ApiError";
import { prisma } from "@repo/db";
import ApiResponse from "../utils/ApiResponse";

const createRoom = AsyncHandler(async (req, res) => {
  const parsedData = roomSchema.safeParse(req.body);
  if (!parsedData.success) {
    throw new ApiError(400, "Invalid Inputs");
  }

  const userId = req.userId;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const room = await prisma.room.create({
      data: {
        RoomName: parsedData.data.RoomName,
        adminId: userId,
      },
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, "Room created successfully", { RoomId: room.id }),
      );
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new ApiError(409, "Room with this name already exists.");
    }
    throw new ApiError(500, "Something went wrong while creating room");
  }
});

const AllChats = AsyncHandler(async (req, res) => {
  const roomId = Number(req.params.roomId);

  if (isNaN(roomId)) {
    return res.status(400).json({
      error: "Invalid room ID",
    });
  }
  const messages = await prisma.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "All recent messages ::-", messages));
});

const Room = AsyncHandler(async (req, res) => {
  const RoomName = req.params.RoomName;
  if (typeof RoomName !== "string") {
    return;
  }
  const room = await prisma.room.findFirst({
    where: {
      RoomName,
    },
  });

  res.json(new ApiResponse(200, "Room found", room));
});
export { createRoom, AllChats, Room };
