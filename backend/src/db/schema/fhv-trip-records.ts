import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  integer,
  unique,
} from "drizzle-orm/pg-core";
import { taxiZoneLookup } from "./taxi-zone-lookup";

export const fhvTripRecords = pgTable(
  "fhv_trip_records",
  {
    id: uuid().primaryKey().defaultRandom(),
    dispatchingBaseNum: varchar().notNull(),
    pickupDatetime: timestamp().notNull(),
    dropoffDatetime: timestamp().notNull(),
    puLocationId: integer().references(() => taxiZoneLookup.id),
    doLocationId: integer().references(() => taxiZoneLookup.id),
    srFlag: integer(),
    affiliatedBaseNum: varchar(),
  },
  (t) => ({
    composite_unique_idx: unique().on(
      t.dispatchingBaseNum,
      t.pickupDatetime,
      t.dropoffDatetime
    ),
  })
);
