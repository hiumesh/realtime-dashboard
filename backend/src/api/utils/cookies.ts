import { Response } from "express";

export function setCookies(res: Response, cookies: Record<string, string>) {
  setCookie(res, "access_token", cookies.access_token);
  setCookie(res, "refresh_token", cookies.refresh_token);
}

export function setCookie(res: Response, key: string, value: string) {
  res.cookie(key, value, {
    httpOnly: true,
    secure: true,
  });
}

export function clearCookieToken(res: Response) {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
}

export function removeCookies(
  res: Response,
  cookies: string[] = ["access_token", "refresh_token"]
) {
  for (const cookie of cookies) {
    res.clearCookie(cookie);
  }
}
