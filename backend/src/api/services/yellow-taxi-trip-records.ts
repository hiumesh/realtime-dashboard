import { yellowTaxiTripRecords } from "@/db/schema/yellow-taxi-trip-records";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface FindAllYellowTaxiTripRecordsParameters {
  page?: string;
  pageSize?: string;
  db: PostgresJsDatabase;
}

export async function findAllYellowTaxiTripRecords({
  page = "1",
  pageSize = "20",
  db,
}: FindAllYellowTaxiTripRecordsParameters) {
  return db
    .select()
    .from(yellowTaxiTripRecords)
    .limit(Number(pageSize))
    .offset((Number(page) - 1) * Number(pageSize));
}

export async function countAllYellowTaxiTripRecords(db: PostgresJsDatabase) {
  return db.$count(yellowTaxiTripRecords);
}
