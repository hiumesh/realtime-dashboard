import {
  integer,
  pgEnum,
  pgTable,
  real,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { taxiZoneLookup } from "./taxi-zone-lookup";

export const tokenTypesEnum = pgEnum("store_and_fwd_flag", ["Y", "N"]);

export const greenTaxiTripRecords = pgTable(
  "green_taxi_trip_records",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    vendorId: integer().notNull(),
    lpepPickupDatetime: timestamp().notNull(),
    lpepDropoffDatetime: timestamp().notNull(),
    storeAndFwdFlag: tokenTypesEnum(),
    rateCodeId: integer().notNull(),
    puLocationId: integer()
      .notNull()
      .references(() => taxiZoneLookup.id),
    doLocationId: integer()
      .notNull()
      .references(() => taxiZoneLookup.id),
    passengerCount: integer().notNull(),
    tripDistance: real().notNull(),
    fareAmount: real().notNull(),
    extra: real().notNull(),
    mtaTax: real().notNull(),
    tipAmount: real().notNull(),
    tollsAmount: real().notNull(),
    improvementSurcharge: real().notNull(),
    totalAmount: real().notNull(),
    paymentType: integer().notNull(),
    ehailFee: real(),
    tripType: integer(),
    congestionSurcharge: real(),
    airportFee: real(),
  },
  (t) => ({
    unique: unique().on(
      t.lpepDropoffDatetime,
      t.lpepPickupDatetime,
      t.puLocationId,
      t.doLocationId
    ),
  })
);
