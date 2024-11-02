"use server";

import { REST_URL } from "@/lib/constant";
import { APIServiceHandler } from "@/types/api";

export async function initUpdatePassword(
  email: string
): Promise<APIServiceHandler> {
  const response = await fetch(`${REST_URL}/users/forgot-password`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok && data) return { data: null, error: data };
  if (!response.ok)
    throw new Error(
      `HTTP error! Status: ${response.status}, ${response.statusText}`
    );

  return { data, error: null };
}
