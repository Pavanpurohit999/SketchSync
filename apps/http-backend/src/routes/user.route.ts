import { Router } from "express";
import { Signin, Signup } from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/signup").post(Signup);
userRouter.route("/signin").post(Signin);

export default userRouter;
