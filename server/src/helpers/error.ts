import { Request, Response } from "express";
import { logger } from "~/utils/logger";

class ErrorHandler extends Error {
  status: string;
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.status = "error";
    this.statusCode = statusCode;
    this.message = message;
  }
}

class UserExistsError extends Error {
  field: string;
  constructor(message: string, field: string) {
    super(message);
    this.name = "UserExistsError";
    this.field = field;
  }
}

const handleError = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  next: () => void
): void => {
  const { statusCode, message } = err;
  logger.error(err);
  res.status(statusCode || 500).json({
    status: "error",
    statusCode: statusCode || 500,
    message: statusCode === 500 ? "An error occurred" : message,
  });
  next();
};

export { ErrorHandler, handleError, UserExistsError };
