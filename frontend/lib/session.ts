"use server";

import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refreshToken } from "@/services/api/auth";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function decrypt(accessToken: string | undefined = "") {
  try {
    const payload = (
      await jose.jwtVerify<SessionPayload>(accessToken, secretKey)
    ).payload;
    return payload;
  } catch (error: unknown) {
    console.log("Failed to verify session", error);
  }
}

export async function validateSessionInMiddleware(
  accessToken?: string,
  refreshToken?: string
) {
  try {
    if (!accessToken) throw new Error("No access token");
    const payload = (
      await jose.jwtVerify<SessionPayload>(accessToken, secretKey)
    ).payload;
    return { payload };
  } catch (error) {
    try {
      const data = await refreshTokenIfPossible(refreshToken);
      const payload = (
        await jose.jwtVerify<SessionPayload>(data.token, secretKey)
      ).payload;
      return { payload, newSession: data };
    } catch (error) {
      console.log("Failed to decrypt session: ", error);
    }
    console.log("Failed to decrypt session: ", error);
  }
}

export const verifySession = async () => {
  const cookie = cookies().get("access_token")?.value;
  const session = await decrypt(cookie);

  if (!session?.sub) {
    redirect("/login");
  }

  return { ...session, isAuth: true, userId: session.sub };
};

export const refreshTokenIfPossible = async (token?: string) => {
  if (!token) {
    throw new Error("No refresh token");
  }
  return await refreshToken();
};
