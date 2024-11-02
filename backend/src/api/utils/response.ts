import { Response } from "express";
import { ZodError } from "zod";

interface SendSuccessResponseParameters {
  status?: number;
  res: Response;
  message: string;
  data?: any;
}
export function sendSuccessResponse({
  res,
  message,
  data,
  status = 200,
}: SendSuccessResponseParameters) {
  return res.status(status).json({
    message,
    data,
  });
}

interface SendErrorResponseParameters {
  status?: number;
  res: Response;
  message: string;
  error?: any;
  errors?: any;
}
export function sendErrorResponse({
  status = 400,
  res,
  message,
  error,
  errors,
}: SendErrorResponseParameters) {
  return res.status(status).json({
    message,
    error,
    errors,
  });
}

interface HandleControllerErrorParameters {
  error: unknown;
  res: Response;
}
export function handleControllerError({
  error,
  res,
}: HandleControllerErrorParameters) {
  if (error instanceof Error)
    sendErrorResponse({
      res,
      status: 400,
      message: error.message || "Unknown Error",
      error,
    });
  else
    sendErrorResponse({ res, status: 500, message: "Internal server error" });
}

export function parseZodError(error: ZodError): string {
  return error.errors
    .map((err) => {
      const path = err.path.join(" > ");
      const message = err.message;
      return `Path: ${path}, Error: ${message}`;
    })
    .join("\n");
}
