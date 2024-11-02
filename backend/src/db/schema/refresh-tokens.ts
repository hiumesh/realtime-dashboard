import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { sessions } from "./sessions";

export const refreshTokens = pgTable("refresh_tokens", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  token: varchar().notNull(),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  revoked: boolean().default(false),
  parent: varchar(),
  sessionId: uuid()
    .references(() => sessions.id)
    .notNull(),
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
});
