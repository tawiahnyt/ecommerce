/** @format */

import { Request, Response } from "express";
import { HttpExceptions } from "../exceptions/root";

export const errorMiddleware = (
  error: HttpExceptions,
  req: Request,
  res: Response
) => {
  res
    .status(error.statusCode)
    .json({
      message: error.message,
      errorCode: error.errorCode,
      errors: error.errors,
    });
};
