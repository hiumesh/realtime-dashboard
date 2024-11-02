import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const taxiZoneLookup = pgTable("taxi_zone_lookup", {
  id: integer().primaryKey(),
  borough: varchar().notNull(),
  zone: varchar().notNull(),
  serviceZone: varchar().notNull(),
});
