import { Request, Response } from "express";
import { ErrorHandler } from "~/helpers/error";

const unknownEndpoint = (request: Request, response: Response): void => {
  throw new ErrorHandler(404, "unknown endpoint");
};

export default unknownEndpoint;