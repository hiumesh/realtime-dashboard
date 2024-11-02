import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { parseZodError, sendErrorResponse } from "../utils/response";
import { parse } from "dotenv";

export default function validateRequest(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError)
        sendErrorResponse({
          res,
          status: 400,
          message: "Validation error:\n " + parseZodError(error),
          errors: error.errors.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        });
      else
        sendErrorResponse({
          res,
          status: 500,
          message: "Internal server error",
        });
    }
  };
}
