import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "~/env";
import { ErrorHandler } from "../helpers/error";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) {
    throw new ErrorHandler(401, "Token missing");
  }

  try {
    const verified = jwt.verify(token, env.SECRET) as {
      id: string;
      cartId: number;
    };
    req.user = verified;
    next();
  } catch (error) {
    throw new ErrorHandler(401, error.message || "Invalid Token");
  }
};

export default verifyToken;
