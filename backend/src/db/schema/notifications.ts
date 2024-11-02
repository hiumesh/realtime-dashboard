import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const notificationTypeEnum = pgEnum("notifications_type", [
  "success",
  "info",
  "error",
]);

export const notifications = pgTable("notifications", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  type: notificationTypeEnum().notNull(),
  body: text().notNull(),
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
});
