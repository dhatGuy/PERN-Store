import { Request, Response } from "express";
import { ApiResponse } from "~/utils/apiResponse";
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

  if (err instanceof UserExistsError) {
    res
      .status(409)
      .json(
        ApiResponse.fieldError("User already exists", [
          { id: err.field, error: err.message },
        ])
      );
  }

  const response =
    statusCode === 401
      ? ApiResponse.unauthorized()
      : statusCode === 404
        ? ApiResponse.notFound()
        : ApiResponse.serverError();

  res.status(statusCode || 500).json(response);

  next();
};

export { ErrorHandler, handleError, UserExistsError };
