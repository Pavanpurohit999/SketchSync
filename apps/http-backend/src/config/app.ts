import "dotenv/config";
import cors from "cors";
import type { Express } from "express";
import express from "express";
import userRouter from "../routes/user.route";
import RoomRouter from "../routes/room.route";
const app: Express = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/rooms", RoomRouter);

export { app };
