import { fhvTripRecords } from "@/db/schema/fhv-trip-records";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface FindAllFHVTripRecordsParameters {
  page?: string;
  pageSize?: string;
  db: PostgresJsDatabase;
}
export function findAllFHVTripRecords({
  page = "1",
  pageSize = "20",
  db,
}: FindAllFHVTripRecordsParameters) {
  return db
    .select()
    .from(fhvTripRecords)
    .limit(Number(pageSize))
    .offset((Number(page) - 1) * Number(pageSize));
}

export async function countAllFHVTripRecords(db: PostgresJsDatabase) {
  return db.$count(fhvTripRecords);
}
