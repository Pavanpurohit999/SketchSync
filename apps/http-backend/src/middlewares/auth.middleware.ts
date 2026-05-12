import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import ApiError from "../utils/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/token";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

interface AuthPayload extends JwtPayload {
  userId: string;
}

export const verifyAuth = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers["authorization"]?.replace("Bearer ", "").trim();
      if (!token) {
        throw new ApiError(401, "Unauthorized user.");
      }
      const decodedToken = jwt.verify(token, JWT_SECRET) as AuthPayload;

      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      throw new ApiError(
        500,
        error instanceof ApiError
          ? error.message
          : "Something went wrong while verifying user.",
      );
    }
  },
);
