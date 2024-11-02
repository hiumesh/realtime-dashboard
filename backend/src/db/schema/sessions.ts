import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users";

export const sessions = pgTable("sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  refreshedAt: timestamp(),
});
