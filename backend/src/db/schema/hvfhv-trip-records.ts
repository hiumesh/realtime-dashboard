import {
  boolean,
  real,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { taxiZoneLookup } from "./taxi-zone-lookup";

export const hvfhvTripRecords = pgTable("hvfhv_trip_records", {
  id: uuid().primaryKey().defaultRandom(),
  hvfhsLicenseNum: varchar().notNull(),
  dispatchingBaseNum: varchar().notNull(),
  pickupDatetime: timestamp().notNull(),
  dropOffDatetime: timestamp().notNull(),
  puLocationId: integer()
    .notNull()
    .references(() => taxiZoneLookup.id),
  doLocationId: integer()
    .notNull()
    .references(() => taxiZoneLookup.id),
  originatingBaseNum: varchar().notNull(),
  requestDatetime: timestamp().notNull(),
  onSceneDatetime: timestamp().notNull(),
  tripMiles: real().notNull(),
  tripTime: integer().notNull(),
  basePassengerFare: real().notNull(),
  tolls: real().notNull(),
  bcf: real().notNull(),
  salesTax: real().notNull(),
  congestionSurcharge: real().notNull(),
  airportFee: real().notNull(),
  tips: real().notNull(),
  driverPay: real().notNull(),
  sharedRequestFlag: boolean().notNull(),
  sharedMatchFlag: boolean().notNull(),
  accessARideFlag: boolean().notNull(),
  wavRequestFlag: boolean().notNull(),
  wavMatchFlag: boolean().notNull(),
});
