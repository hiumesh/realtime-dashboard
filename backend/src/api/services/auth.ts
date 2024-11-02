import { RefreshToken, User } from "@/types/api/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { secureToken } from "../utils/crypto";
import { sessions } from "@/db/schema/sessions";
import { eq } from "drizzle-orm";
import { refreshTokens } from "@/db/schema/refresh-tokens";

interface CreateRefreshTokenParameters {
  user: User;
  oldToken?: RefreshToken;
  db: PostgresJsDatabase;
}
export async function createRefreshToken({
  user,
  oldToken,
  db,
}: CreateRefreshTokenParameters) {
  const token = secureToken(32);

  let sessionId;
  if (!oldToken) {
    const session = (
      await db
        .insert(sessions)
        .values({
          userId: user.id,
        })
        .returning()
    )[0];

    sessionId = session.id;
  } else {
    sessionId = oldToken.sessionId;
  }

  return (
    await db
      .insert(refreshTokens)
      .values({
        token,
        sessionId: sessionId,
        userId: user.id,
        parent: oldToken?.token,
      })
      .returning()
  )[0];
}

interface GrantRefreshTokenSwapParameters {
  user: User;
  refreshToken: RefreshToken;
  db: PostgresJsDatabase;
}
export async function grantRefreshTokenSwap({
  user,
  refreshToken,
  db,
}: GrantRefreshTokenSwapParameters) {
  return await db.transaction(async (tx) => {
    await tx
      .update(refreshTokens)
      .set({ revoked: true })
      .where(eq(refreshTokens.id, refreshToken.id));
    return await createRefreshToken({ user, oldToken: refreshToken, db: tx });
  });
}

interface GrantAuthenticatedUserParameters {
  user: User;
  db: PostgresJsDatabase;
}
export async function grantAuthenticatedUser({
  user,
  db,
}: GrantAuthenticatedUserParameters) {
  return createRefreshToken({ user, db });
}
