"use server";

import { REST_URL } from "@/lib/constant";
import { APIServiceHandler } from "@/types/api";

export async function signUp(body: unknown): Promise<APIServiceHandler> {
  const response = await fetch(`${REST_URL}/auth/signup`, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok && data) return { data: null, error: data };
  if (!response.ok)
    throw new Error(
      `HTTP error! Status: ${response.status}, ${response.statusText}`
    );

  return { data, error: null };
}
