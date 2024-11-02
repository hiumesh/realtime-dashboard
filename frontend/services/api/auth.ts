"use server";

import { processRestApiResponse } from "@/lib/utils";
import { api } from "@/lib/api";
import { AuthResponse } from "@/types/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
  redirect("/signin");
}

export async function signIn(body: unknown) {
  const response = await api(`/auth/token?grant_type=password`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = processRestApiResponse<AuthResponse>(response);
  return data;
}

export async function refreshToken() {
  const response = await api(`/auth/token?grant_type=refresh_token`, {
    method: "POST",
  });
  const data = processRestApiResponse<AuthResponse>(response);
  return data;
}
