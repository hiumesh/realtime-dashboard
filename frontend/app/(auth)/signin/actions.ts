"use server";

import { signIn } from "@/services/api/auth";
import { cookies } from "next/headers";

export async function login(body: unknown) {
  const data = await signIn(body);
  cookies().set("access_token", data.token);
  cookies().set("refresh_token", data.refreshToken);
  return data;
}
