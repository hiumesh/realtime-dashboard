import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const tokenTypesEnum = pgEnum("one_time_token_types", [
  "confirmation_token",
  "recovery_token",
]);

export type TokenType = (typeof tokenTypesEnum.enumValues)[number];

export const oneTimeTokens = pgTable("one_time_tokens", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  tokenType: tokenTypesEnum().notNull(),
  tokenHash: varchar().notNull(),
  relatesTo: varchar().notNull(),
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
});
