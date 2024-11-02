import { z } from "zod";
import {
  fhvTripRecordCsvZodSchema,
  greenTaxiTripRecordCsvZodSchema,
  hvfhvTripRecordCsvZodSchema,
  taxiZoneLookupCsvZodSchema,
  yellowTaxiTripRecordCsvZodSchema,
} from "./zod-validator";

export type FHVTripCsvRecord = z.infer<typeof fhvTripRecordCsvZodSchema>;
export type HVFHVTripCsvRecord = z.infer<typeof hvfhvTripRecordCsvZodSchema>;
export type TaxiZoneLookupCsvRecord = z.infer<
  typeof taxiZoneLookupCsvZodSchema
>;
export type GreenTaxiTripCsvRecord = z.infer<
  typeof greenTaxiTripRecordCsvZodSchema
>;
export type YellowTaxiTripCsvRecord = z.infer<
  typeof yellowTaxiTripRecordCsvZodSchema
>;
