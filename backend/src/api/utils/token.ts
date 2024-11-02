import { Session, TokenPayload, User } from "@/types/api/common";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import moment from "moment";
import jwt from "jsonwebtoken";
import { ne } from "drizzle-orm";

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export function generateOtp(digits: number) {
  const upper = 10 ** digits;

  const num = crypto.randomInt(0, upper);
  const otp = num.toString().padStart(digits, "0");
  return otp;
}

export function generateTokenHash(email: string, otp: string) {
  const hash = crypto.createHash("sha224");
  hash.update(email + otp);
  return hash.digest("hex");
}

interface GenerateAccessTokenParameters {
  user: User;
  sessionId: string;
}
export function generateAccessToken({
  user,
  sessionId,
}: GenerateAccessTokenParameters) {
  const issuedAt = moment();
  const expiresAt = issuedAt.add(1, "hour");

  const payload = {
    email: user.email,
    role: user.role,
    session_id: sessionId,
    iat: issuedAt.unix(),
    exp: expiresAt.unix(),
  };

  const token = jwt.sign(payload, process.env?.JWT_SECRET as string, {
    subject: user.id,
    issuer: "https://localhost:3000",
  });

  return {
    token,
    issuedAt,
    expiresAt,
  };
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env?.JWT_SECRET as string);
    return decoded as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token Expired");
    }
    throw error;
  }
}
