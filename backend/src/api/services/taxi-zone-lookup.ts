import { taxiZoneLookup } from "@/db/schema/taxi-zone-lookup";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface FindAllTaxiZoneLookupRecordsParameters {
  page?: string;
  pageSize?: string;
  db: PostgresJsDatabase;
}
export function findAllTaxiZoneLookupRecords({
  page = "1",
  pageSize = "20",
  db,
}: FindAllTaxiZoneLookupRecordsParameters) {
  console.log(pageSize, page);
  return db
    .select()
    .from(taxiZoneLookup)
    .limit(Number(pageSize))
    .offset((Number(page) - 1) * Number(pageSize));
}

export async function countAllTaxiZoneLookupRecords(db: PostgresJsDatabase) {
  return db.$count(taxiZoneLookup);
}
