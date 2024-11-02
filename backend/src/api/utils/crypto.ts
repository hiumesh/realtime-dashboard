import crypto from "crypto";

export function secureToken(length = 16) {
  const buffer = crypto.randomBytes(length);
  return buffer.toString("base64url"); // URL-safe Base64 encoding
}
