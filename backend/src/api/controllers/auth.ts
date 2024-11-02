import { NextFunction, Request, Response } from "express";
import { SignupRequest, TokenRequest } from "@/types/api/requests";
import {
  createUser,
  getUserByEmail,
  getUserById,
  setConfirmationTokenOfUser,
} from "../services/users";
import db from "@/db";
import { sendConfirmationEmail } from "../services/mail";
import {
  handleControllerError,
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/response";
import {
  getRefreshTokenByToken,
  getSessionById,
  updateSessionRefreshInfo,
} from "../services/sessions";
import {
  grantAuthenticatedUser,
  grantRefreshTokenSwap,
} from "../services/auth";
import { comparePassword, generateAccessToken } from "../utils/token";
import { User } from "@/types/api/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { clearCookieToken, setCookies } from "../utils/cookies";

interface FindUserWithRefreshTokenParameters {
  token: string;
  db: PostgresJsDatabase;
  forUpdate?: boolean;
}
async function findUserWithRefreshToken({
  token,
  db,
  forUpdate = false,
}: FindUserWithRefreshTokenParameters) {
  const refreshToken = await getRefreshTokenByToken({
    token,
    db,
    forUpdate,
  });
  const user = await getUserById({
    userId: refreshToken.userId,
    db,
    forUpdate,
  });
  const session = await getSessionById({
    sessionId: refreshToken.sessionId,
    db,
    forUpdate,
  });

  return {
    refreshToken,
    user,
    session,
  };
}

interface RefreshTokenGrantParameters {
  token: string;
  db: PostgresJsDatabase;
}
async function refreshTokenGrant({ token, db }: RefreshTokenGrantParameters) {
  const { refreshToken, user, session } = await findUserWithRefreshToken({
    token,
    db,
  });
  if (refreshToken.revoked) throw new Error("Refresh token has been revoked");

  const newRefreshToken = await grantRefreshTokenSwap({
    refreshToken,
    user,
    db,
  });
  const {
    token: accessToken,
    expiresAt,
    issuedAt,
  } = generateAccessToken({ user, sessionId: session.id });

  await updateSessionRefreshInfo({
    sessionId: session.id,
    refreshedAt: issuedAt.toDate(),
    db,
  });

  return {
    token: accessToken,
    tokenType: "Bearer",
    expiresAt,
    refreshToken: newRefreshToken.token,
    sessionId: newRefreshToken.sessionId,
    user: {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

interface IssueRefreshTokenParameters {
  user: User;
  db: PostgresJsDatabase;
}
async function issueRefreshToken({ user, db }: IssueRefreshTokenParameters) {
  return await db.transaction(async (tx) => {
    const refreshToken = await grantAuthenticatedUser({ user, db: tx });
    const accessToken = generateAccessToken({
      sessionId: refreshToken.sessionId,
      user,
    });

    return {
      token: accessToken.token,
      tokenType: "Bearer",
      expiresAt: accessToken.expiresAt,
      refreshToken: refreshToken.token,
      sessionId: refreshToken.sessionId,
      user: {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
    };
  });
}

interface ResourceOwnerPasswordGrantParameters {
  credentials: { email: string; password: string };
  db: PostgresJsDatabase;
}
async function resourceOwnerPasswordGrant({
  credentials,
  db,
}: ResourceOwnerPasswordGrantParameters) {
  const user = await getUserByEmail({
    email: credentials.email,
    db,
  });

  if (!user.encryptedPassword) throw new Error("Invalid Login Grant");
  // if (user.emailConfirmedAt === null) throw new Error("Email not confirmed");

  if (!comparePassword(credentials.password, user.encryptedPassword))
    throw new Error("Invalid Password");

  return await issueRefreshToken({ user, db });
}

export async function token(req: TokenRequest, res: Response) {
  try {
    let data;
    switch (req.query.grant_type) {
      case "refresh_token":
        if (
          !("refresh_token" in req.cookies) ||
          typeof req.cookies.refresh_token !== "string"
        ) {
          throw new Error("Refresh Token not found!");
        }
        data = await refreshTokenGrant({
          token: req.cookies.refresh_token,
          db,
        });
        break;
      case "password":
        data = await resourceOwnerPasswordGrant({
          credentials: {
            email: req.body.email as string,
            password: req.body.password as string,
          },
          db,
        });

        break;
      default:
        throw new Error("Invalid grant type");
    }

    setCookies(res, {
      access_token: data.token,
      refresh_token: data.refreshToken,
    });
    sendSuccessResponse({
      res,
      status: 200,
      message: "Password grant",
      data: data,
    });
  } catch (error) {
    clearCookieToken(res);
    console.log(error);
    handleControllerError({ error, res });
  }
}

export async function signup(req: SignupRequest, res: Response) {
  try {
    await db.transaction(async (tx) => {
      const user = await createUser({
        user: req.body,
        isSsoUser: false,
        db: tx,
      });
      // const { token, sentAt } = await sendConfirmationEmail(user);
      // await setConfirmationTokenOfUser({
      //   userId: user.id,
      //   token,
      //   sentAt,
      //   db: tx,
      // });
    });
    sendSuccessResponse({
      res,
      status: 201,
      message: "User created successfully",
    });
  } catch (error) {
    handleControllerError({ error, res });
  }
}

export function logout(req: Request, res: Response) {}

export function authorize(req: Request, res: Response) {}

export function errorHandler(err: Error, req: Request, res: Response) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 400;
  res.status(statusCode);
  res.json({
    message: err.message || "Internal server error",
  });
}
