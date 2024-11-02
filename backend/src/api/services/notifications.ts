import { notifications } from "@/db/schema/notifications";
import { desc, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface GetNotificationsParameters {
  userId: string;
  db: PostgresJsDatabase;
}

export function getNotifications({ userId, db }: GetNotificationsParameters) {
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .limit(20)
    .orderBy(desc(notifications.createdAt));
}

interface CreateNotificationParameters {
  userId: string;
  type: "success" | "info" | "error";
  body: string;
  db: PostgresJsDatabase;
}

export async function createNotification({
  userId,
  type,
  body,
  db,
}: CreateNotificationParameters) {
  return (
    await db.insert(notifications).values({ userId, type, body }).returning()
  )[0];
}
