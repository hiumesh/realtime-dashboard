import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import { sendErrorResponse } from "../utils/response";

export async function checkAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { access_token } = req.cookies;
    if (!access_token) throw new Error("Access Token Not Found!");

    const payload = verifyToken(access_token);
    req.user = { ...payload, user_id: payload.sub };
    next();
  } catch (error) {
    if (error instanceof Error) {
      sendErrorResponse({
        res,
        status: 401,
        message: error?.message || "Unauthorized",
      });
    } else {
      sendErrorResponse({
        res,
        status: 401,
        message: "Unauthorized",
      });
    }
  }
}

export function checkAuthorized(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user?.role)) {
      next();
    } else {
      sendErrorResponse({
        res,
        status: 403,
        message: "Unauthorized",
      });
    }
  };
}
