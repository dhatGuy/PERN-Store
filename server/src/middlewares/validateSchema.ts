import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ApiResponse } from "~/utils/apiResponse";

const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json(
          ApiResponse.fieldError(
            "Validation error",
            error.issues.map((issue) => ({
              id: issue.path.join("."),
              error: issue.message,
            }))
          )
        );
      }
      next(error);
    }
  };
};

export default validateRequest;
