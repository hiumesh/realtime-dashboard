import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("users_role", ["admin", "manager", "user"]);

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  isSsoUser: boolean().notNull(),
  email: varchar().unique().notNull(),
  role: roleEnum().notNull().default("user"),
  encryptedPassword: varchar(),
  confirmationToken: varchar(),
  confirmationSentAt: timestamp(),
  emailConfirmedAt: timestamp(),
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
});
