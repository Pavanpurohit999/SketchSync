import AsyncHandler from "../utils/AsyncHandler";
import ApiError from "../utils/ApiError";
import { SigninSchema, SignupSchema } from "@repo/common/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db";

import ApiResponse from "../utils/ApiResponse";
import { JWT_SECRET } from "@repo/common-backend/token";

const Signup = AsyncHandler(async (req, res) => {
  const parsedBody = SignupSchema.safeParse(req.body);
  if (!parsedBody.success) {
    throw new ApiError(400, "Invalid Input.");
  }
  try {
    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);

    const user = await prisma.user.create({
      data: {
        username: parsedBody.data.username,
        email: parsedBody.data.email,
        password: hashedPassword,
        avatar: parsedBody.data.avatar,
      },
    });

    res.json(new ApiResponse(201, "User created Successfully", { user }));
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new ApiError(409, "User with this email or username already exists.");
    }
    throw new ApiError(500, "Something went wrong while creating user");
  }
});

const Signin = AsyncHandler(async (req, res) => {
  const parsedBody = SigninSchema.safeParse(req.body);
  if (!parsedBody.success) {
    throw new ApiError(400, "Invalid Inputs");
  }
  const { email, username, password } = parsedBody.data;
  const LoginUser = await prisma.user.findUnique({
    where: username ? { username } : { email },
  });
  if (!LoginUser) {
    throw new ApiError(404, "User not found");
  }

  const isValidPassword = await bcrypt.compare(password, LoginUser.password);
  if (!isValidPassword) {
    throw new ApiError(401, "Unauthorized user.");
  }
  const token = jwt.sign({ userId: LoginUser?.id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const { password: _, ...safeUser } = LoginUser;

  res.status(200).json(
    new ApiResponse(200, "User successfully Signed in.", {
      safeUser,
      token,
    }),
  );
});

export { Signup, Signin };
