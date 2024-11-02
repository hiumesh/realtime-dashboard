import { sql } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface TotalTripsPerDayOrMonthByVehicleTypeParameters {
  db: PostgresJsDatabase;
}
export async function totalTripsPerDayOrMonthByVehicleType({
  db,
}: TotalTripsPerDayOrMonthByVehicleTypeParameters) {
  return await db.execute(sql`
    SELECT 
        TO_CHAR(DATE_TRUNC('month', lpep_pickup_datetime), 'Month') AS month_name, 
        'green' AS vehicle_type, 
        COUNT(*) AS total_trips
    FROM green_taxi_trip_records
    WHERE DATE_PART('year', lpep_pickup_datetime) = DATE_PART('year', CURRENT_DATE)
    GROUP BY month_name

    UNION ALL

    SELECT 
        TO_CHAR(DATE_TRUNC('month', tpep_pickup_datetime), 'Month') AS month_name, 
        'yellow' AS vehicle_type, 
        COUNT(*) AS total_trips
    FROM yellow_taxi_trip_records
    WHERE DATE_PART('year', tpep_pickup_datetime) = DATE_PART('year', CURRENT_DATE)
    GROUP BY month_name

    UNION ALL

    SELECT 
        TO_CHAR(DATE_TRUNC('month', pickup_datetime), 'Month') AS month_name, 
        'fhv' AS vehicle_type, 
        COUNT(*) AS total_trips
    FROM fhv_trip_records
    WHERE DATE_PART('year', pickup_datetime) = DATE_PART('year', CURRENT_DATE)
    GROUP BY month_name

    UNION ALL

    SELECT 
        TO_CHAR(DATE_TRUNC('month', pickup_datetime), 'Month') AS month_name, 
        'hvfhv' AS vehicle_type, 
        COUNT(*) AS total_trips
    FROM hvfhv_trip_records
    WHERE DATE_PART('year', pickup_datetime) = DATE_PART('year', CURRENT_DATE)
    GROUP BY month_name;

`);
}

// SELECT
//     pu_location_id AS location,
//     COUNT(*) AS pickup_count
// FROM green_taxi_trip_records
// GROUP BY location
// UNION ALL
// SELECT
//     pu_location_id AS location,
//     COUNT(*) AS pickup_count
// FROM yellow_taxi_trip_records
// GROUP BY location
// UNION ALL
// SELECT
//     pu_location_id AS location,
//     COUNT(*) AS pickup_count
// FROM hvfhv_trip_records
// GROUP BY location
// UNION ALL
// SELECT
//     pu_location_id AS location,
//     COUNT(*) AS pickup_count
// FROM fhv_trip_records
// GROUP BY location
// order by location

interface PaymentMethodDistributionGreenTaxiTripRecordsParameters {
  db: PostgresJsDatabase;
}
export async function paymentMethodDistributionGreenTaxiTripRecords({
  db,
}: PaymentMethodDistributionGreenTaxiTripRecordsParameters) {
  return await db.execute(sql`
    SELECT 
        payment_type, 
        COUNT(*) AS payment_count
    FROM green_taxi_trip_records
    GROUP BY payment_type
  `);
}

interface PaymentMethodDistributionYellowTaxiTripRecordsParameters {
  db: PostgresJsDatabase;
}
export async function paymentMethodDistributionYellowTaxiTripRecords({
  db,
}: PaymentMethodDistributionYellowTaxiTripRecordsParameters) {
  return await db.execute(sql`
    SELECT 
        payment_type, 
        COUNT(*) AS payment_count
    FROM yellow_taxi_trip_records
    GROUP BY payment_type
  `);
}

interface PaymentMethodDistributionFhvTripRecordsParameters {
  db: PostgresJsDatabase;
}
export async function paymentMethodDistributionFhvTripRecords({
  db,
}: PaymentMethodDistributionFhvTripRecordsParameters) {
  return await db.execute(sql`
    SELECT 
        payment_type, 
        COUNT(*) AS payment_count
    FROM fhv_trip_records
    GROUP BY payment_type
  `);
}

interface PaymentMethodDistributionHvFhvTripRecordsParameters {
  db: PostgresJsDatabase;
}
export async function paymentMethodDistributionHvFhvTripRecords({
  db,
}: PaymentMethodDistributionHvFhvTripRecordsParameters) {
  return await db.execute(sql`
    SELECT 
        payment_type, 
        COUNT(*) AS payment_count
    FROM hvfhv_trip_records
    GROUP BY payment_type
  `);
}
