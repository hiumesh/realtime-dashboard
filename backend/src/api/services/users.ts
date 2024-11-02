import { users } from "@/db/schema/users";
import { UserCredentials } from "@/types/api/services";
import { eq, isNull } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { hashPassword } from "../utils/token";

interface CreateUserParameters {
  user: UserCredentials;
  isSsoUser: boolean;
  db: PostgresJsDatabase;
}
export async function createUser({
  user,
  isSsoUser = false,
  db,
}: CreateUserParameters) {
  const { email, password } = user;
  if (isSsoUser) {
    return (
      await db.insert(users).values({ email, isSsoUser: true }).returning()
    )[0];
  }

  const encryptedPassword = await hashPassword(password);

  return (
    await db
      .insert(users)
      .values({ email, encryptedPassword, isSsoUser: false })
      .returning()
  )[0];
}

interface SetConfirmationTokenOfUserParameters {
  userId: string;
  token: string;
  sentAt: Date;
  db: PostgresJsDatabase;
}
export async function setConfirmationTokenOfUser({
  userId,
  token,
  sentAt,
  db,
}: SetConfirmationTokenOfUserParameters) {
  return await db
    .update(users)
    .set({ confirmationToken: token, confirmationSentAt: sentAt })
    .where(eq(users.id, userId));
}

interface GetUserParameters {
  userId: string;
  db: PostgresJsDatabase;
  forUpdate?: boolean;
}
export async function getUserById({
  userId,
  db,
  forUpdate,
}: GetUserParameters) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .for(forUpdate ? "update" : "share");
  if (user.length === 0) throw new Error("User not found");
  return user[0];
}

interface GetUserByEmailParameters {
  email: string;
  db: PostgresJsDatabase;
}
export async function getUserByEmail({ email, db }: GetUserByEmailParameters) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) throw new Error("User not found");

  return user[0];
}

interface FindAllUsersParameters {
  page?: string;
  pageSize?: string;
  db: PostgresJsDatabase;
}

export async function findAllUsers({
  page = "1",
  pageSize = "20",
  db,
}: FindAllUsersParameters) {
  return db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      created_at: users.createdAt,
    })
    .from(users)
    .where(isNull(users.deletedAt))
    .limit(Number(pageSize))
    .offset((Number(page) - 1) * Number(pageSize));
}

export async function countAllUsers(db: PostgresJsDatabase) {
  return db.$count(users, isNull(users.deletedAt));
}

interface UpdateRoleParameters {
  userId: string;
  role: "admin" | "manager" | "user";
  db: PostgresJsDatabase;
}
export async function updateRole({ userId, role, db }: UpdateRoleParameters) {
  return await db.update(users).set({ role: role }).where(eq(users.id, userId));
}
