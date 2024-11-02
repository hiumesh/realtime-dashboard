import { sessions } from "@/db/schema/sessions";
import { User } from "@/types/api/common";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { refreshTokens } from "@/db/schema/refresh-tokens";

interface FindSessionByIdParameters {
  sessionId: string;
  forUpdate: boolean;
  db: PostgresJsDatabase;
}
export async function findSessionById({
  sessionId,
  db,
  forUpdate = false,
}: FindSessionByIdParameters) {
  if (forUpdate)
    return (
      await db
        .select()
        .from(sessions)
        .where(eq(sessions.id, sessionId))
        .limit(1)
        .for("update")
    )[0];

  return (
    await db.select().from(sessions).where(eq(sessions.id, sessionId)).limit(1)
  )[0];
}

interface CreateSessionParameters {
  user: User;
  db: PostgresJsDatabase;
}
export async function createSession({ user, db }: CreateSessionParameters) {
  return await db
    .insert(sessions)
    .values({
      userId: user.id,
    })
    .returning();
}

interface GetSessionByIdParameters {
  sessionId: string;
  db: PostgresJsDatabase;
  forUpdate?: boolean;
}
export async function getSessionById({
  sessionId,
  db,
  forUpdate = false,
}: GetSessionByIdParameters) {
  const session = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1)
    .for(forUpdate ? "update" : "share");
  if (session.length === 0) throw new Error("Session not found");

  return session[0];
}

interface GetRefreshTokenByTokenParameters {
  token: string;
  db: PostgresJsDatabase;
  forUpdate?: boolean;
}
export async function getRefreshTokenByToken({
  token,
  db,
  forUpdate,
}: GetRefreshTokenByTokenParameters) {
  const refreshToken = await db
    .select()
    .from(refreshTokens)
    .where(eq(refreshTokens.token, token))
    .limit(1)
    .for(forUpdate ? "update" : "share");
  if (refreshToken.length === 0) throw new Error("Refresh token not found");
  return refreshToken[0];
}

interface UpdateSessionRefreshInfoParameters {
  sessionId: string;
  refreshedAt: Date;
  db: PostgresJsDatabase;
}
export async function updateSessionRefreshInfo({
  sessionId,
  refreshedAt,
  db,
}: UpdateSessionRefreshInfoParameters) {
  return await db
    .update(sessions)
    .set({ refreshedAt: refreshedAt })
    .where(eq(sessions.id, sessionId));
}
