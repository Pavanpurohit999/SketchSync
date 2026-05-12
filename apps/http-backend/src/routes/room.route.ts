import { Router } from "express";
import { AllChats, createRoom, Room } from "../controllers/room.controller";
import { verifyAuth } from "../middlewares/auth.middleware";
const RoomRouter = Router();

RoomRouter.route("/create").post(verifyAuth, createRoom);
RoomRouter.route("/chats/:roomId").get(AllChats);
RoomRouter.route("/room/:RoomName").post(verifyAuth, Room);
export default RoomRouter;
