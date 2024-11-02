import { cookies } from "next/headers";
import { REST_URL } from "./constant";

export async function api(input: string, init?: RequestInit) {
  const url = new URL(input, REST_URL as string);
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    credentials: "include",
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });
  return response;
}
