import { greenTaxiTripRecords } from "@/db/schema/green-taxi-trip-records";
import { C } from "drizzle-kit/common-DYjgLS6u";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface FindAllGreenTaxiTripRecordsParameters {
  page?: string;
  pageSize?: string;
  db: PostgresJsDatabase;
}
export async function findAllGreenTaxiTripRecords({
  page = "1",
  pageSize = "20",
  db,
}: FindAllGreenTaxiTripRecordsParameters) {
  return db
    .select()
    .from(greenTaxiTripRecords)
    .limit(Number(pageSize))
    .offset((Number(page) - 1) * Number(pageSize));
}

export async function countAllGreenTaxiTripRecords(db: PostgresJsDatabase) {
  return db.$count(greenTaxiTripRecords);
}
