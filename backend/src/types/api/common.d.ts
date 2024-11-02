import { fhvTripRecords } from "@/db/schema/fhv-trip-records";
import { greenTaxiTripRecords } from "@/db/schema/green-taxi-trip-records";
import { hvfhvTripRecords } from "@/db/schema/hvfhv-trip-records";
import { refreshTokens } from "@/db/schema/refresh-tokens";
import { sessions } from "@/db/schema/sessions";
import { taxiZoneLookup } from "@/db/schema/taxi-zone-lookup";
import { users } from "@/db/schema/users";
import { yellowTaxiTripRecords } from "@/db/schema/yellow-taxi-trip-records";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;
export type RefreshToken = InferSelectModel<typeof refreshTokens>;
export type FHVTripRecord = InferSelectModel<typeof fhvTripRecords>;
export type TaxiZoneLookup = InferSelectModel<typeof taxiZoneLookup>;
export type GreenTaxiTripRecord = InferSelectModel<typeof greenTaxiTripRecords>;

export type YellowTaxiTripRecord = InferSelectModel<
  typeof yellowTaxiTripRecords
>;
export type HVFHVTripRecord = InferSelectModel<typeof hvfhvTripRecords>;

export type TokenPayload = {
  sub: string;
  email: string;
  role: string;
  session_id: string;
};

export type UserPayload = Omit<TokenPayload, "sub"> & { user_id: string };
