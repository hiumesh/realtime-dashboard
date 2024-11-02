import { hvfhvTripRecords } from "@/db/schema/hvfhv-trip-records";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface FindAllHVFHVTripRecordsParameters {
  page?: string;
  pageSize?: string;
  db: PostgresJsDatabase;
}
export function findAllHVFHVTripRecords({
  page = "1",
  pageSize = "20",
  db,
}: FindAllHVFHVTripRecordsParameters) {
  return db
    .select()
    .from(hvfhvTripRecords)
    .limit(Number(pageSize))
    .offset((Number(page) - 1) * Number(pageSize));
}

export async function countAllHVFHVTripRecords(db: PostgresJsDatabase) {
  return db.$count(hvfhvTripRecords);
}
