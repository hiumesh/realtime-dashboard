import {
  real,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  unique,
} from "drizzle-orm/pg-core";
import { taxiZoneLookup } from "./taxi-zone-lookup";

export const tokenTypesEnum = pgEnum("store_and_fwd_flag", ["Y", "N"]);

export const yellowTaxiTripRecords = pgTable(
  "yellow_taxi_trip_records",
  {
    id: uuid().primaryKey().defaultRandom(),
    vendorId: integer().notNull(),
    tpepPickupDatetime: timestamp().notNull(),
    tpepDropoffDatetime: timestamp().notNull(),
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
      t.tpepDropoffDatetime,
      t.tpepPickupDatetime,
      t.doLocationId,
      t.puLocationId
    ),
  })
);
