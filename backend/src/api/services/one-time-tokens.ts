import { oneTimeTokens, TokenType } from "@/db/schema/one-time-tokens";
import { and, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export function createOneTimeToken(
  userId: string,
  relatesTo: string,
  tokenHash: string,
  tokenType: TokenType,
  db: PostgresJsDatabase
) {
  return db
    .insert(oneTimeTokens)
    .values({ userId, relatesTo, tokenHash, tokenType });
}

export async function clearOneTimeTokenForUser(
  userId: string,
  tokenType: TokenType,
  db: PostgresJsDatabase
) {
  return db
    .delete(oneTimeTokens)
    .where(
      and(
        eq(oneTimeTokens.userId, userId),
        eq(oneTimeTokens.tokenType, tokenType)
      )
    );
}
