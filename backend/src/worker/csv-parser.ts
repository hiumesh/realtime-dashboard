import csv from "csv-parser";
import { pipeline } from "stream/promises";
import { getS3ObjectStream } from "@/utils/s3";
import db from "@/db";
import { fhvTripRecords } from "@/db/schema/fhv-trip-records";
import {
  FHVTripCsvRecord,
  GreenTaxiTripCsvRecord,
  HVFHVTripCsvRecord,
  TaxiZoneLookupCsvRecord,
  YellowTaxiTripCsvRecord,
} from "@/types/worker/types";
import { ZodSchema } from "zod";
import {
  fhvTripRecordCsvZodSchema,
  greenTaxiTripRecordCsvZodSchema,
  hvfhvTripRecordCsvZodSchema,
  taxiZoneLookupCsvZodSchema,
  yellowTaxiTripRecordCsvZodSchema,
} from "./zod-validator";
import { sql } from "drizzle-orm";
import moment from "moment";
import { taxiZoneLookup } from "@/db/schema/taxi-zone-lookup";
import { yellowTaxiTripRecords } from "@/db/schema/yellow-taxi-trip-records";
import { greenTaxiTripRecords } from "@/db/schema/green-taxi-trip-records";
import { hvfhvTripRecords } from "@/db/schema/hvfhv-trip-records";

const BATCH_SIZE = 1000;

async function processFHVTripRecordsBatch(batch: FHVTripCsvRecord[]) {
  console.log("Processing batch...");
  await db
    .insert(fhvTripRecords)
    .values(
      batch.map((item) => {
        return {
          dispatchingBaseNum: item.dispatching_base_num,
          pickupDatetime: moment(item.pickup_datetime).toDate(),
          dropoffDatetime: moment(item.dropOff_datetime).toDate(),
          puLocationId: item.PUlocationID ? Number(item.PUlocationID) : null,
          doLocationId: item.DOlocationID ? Number(item.DOlocationID) : null,
          srFlag: item.SR_Flag ? Number(item.SR_Flag) : null,
          affiliatedBaseNum: item.Affiliated_base_number
            ? item.Affiliated_base_number
            : null,
        };
      })
    )
    .onConflictDoNothing({
      target: [
        fhvTripRecords.dispatchingBaseNum,
        fhvTripRecords.dropoffDatetime,
        fhvTripRecords.pickupDatetime,
      ],
    });
  // .onConflictDoUpdate({
  //   target: [
  //     fhvTripRecords.dispatchingBaseNum,
  //     fhvTripRecords.dropoffDatetime,
  //     fhvTripRecords.pickupDatetime,
  //   ],
  //   set: {
  //     puLocationId: sql`excluded.pu_location_id`,
  //     doLocationId: sql`excluded.do_location_id`,
  //     srFlag: sql`excluded.sr_flag`,
  //     affiliatedBaseNum: sql`excluded.affiliated_base_num`,
  //   },
  // });
}

export async function processHVFHVTripRecordsBatch(
  batch: HVFHVTripCsvRecord[]
) {
  console.log("Processing batch...");
  await db.insert(hvfhvTripRecords).values(
    batch.map((item) => {
      return {
        hvfhsLicenseNum: item.Hvfhs_license_num,
        dispatchingBaseNum: item.Dispatching_base_num,
        pickupDatetime: moment(item.Pickup_datetime).toDate(),
        dropOffDatetime: moment(item.DropOff_datetime).toDate(),
        puLocationId: Number(item.PUlocationID),
        doLocationId: Number(item.DOlocationID),
        originatingBaseNum: item.originating_base_num,
        requestDatetime: moment(item.request_datetime).toDate(),
        onSceneDatetime: moment(item.on_scene_datetime).toDate(),
        tripMiles: Number(item.trip_miles),
        tripTime: Number(item.trip_time),
        basePassengerFare: Number(item.base_passenger_fare),
        tolls: Number(item.tolls),
        bcf: Number(item.bcf),
        salesTax: Number(item.sales_tax),
        congestionSurcharge: Number(item.congestion_surcharge),
        airportFee: Number(item.airport_fee),
        tips: Number(item.tips),
        driverPay: Number(item.driver_pay),
        sharedRequestFlag: item.shared_request_flag ? true : false,
        sharedMatchFlag: item.shared_match_flag ? true : false,
        accessARideFlag: item.access_a_ride_flag ? true : false,
        wavRequestFlag: item.wav_request_flag ? true : false,
        wavMatchFlag: item.wav_match_flag ? true : false,
      };
    })
  );
}

async function processTaxiZoneLookupBatch(batch: TaxiZoneLookupCsvRecord[]) {
  console.log("Processing batch...");
  await db
    .insert(taxiZoneLookup)
    .values(
      batch.map((item) => {
        return {
          id: Number(item.LocationID),
          borough: item.Borough,
          zone: item.Zone,
          serviceZone: item.service_zone,
        };
      })
    )
    .onConflictDoUpdate({
      target: taxiZoneLookup.id,
      set: {
        borough: sql`excluded.borough`,
        zone: sql`excluded.zone`,
        serviceZone: sql`excluded.service_zone`,
      },
    });
}

export async function processYellowTaxiTripRecordsBatch(
  batch: YellowTaxiTripCsvRecord[]
) {
  console.log("Processing batch...");
  await db
    .insert(yellowTaxiTripRecords)
    .values(
      batch.map((item) => {
        return {
          vendorId: Number(item.VendorID),
          tpepPickupDatetime: moment(item.tpep_pickup_datetime).toDate(),
          tpepDropoffDatetime: moment(item.tpep_dropoff_datetime).toDate(),
          passengerCount: Number(item.passenger_count),
          tripDistance: Number(item.trip_distance),
          rateCodeId: Number(item.RatecodeID),
          storeAndFwdFlag: item.store_and_fwd_flag
            ? item.store_and_fwd_flag
            : null,
          puLocationId: Number(item.PULocationID),
          doLocationId: Number(item.DOLocationID),
          paymentType: Number(item.payment_type),
          fareAmount: Number(item.fare_amount),
          extra: Number(item.extra),
          mtaTax: Number(item.mta_tax),
          tipAmount: Number(item.tip_amount),
          tollsAmount: Number(item.tolls_amount),
          improvementSurcharge: Number(item.improvement_surcharge),
          totalAmount: Number(item.total_amount),
          tripType: item.trip_type ? Number(item.trip_type) : null,
          congestionSurcharge: item.congestion_surcharge
            ? Number(item.congestion_surcharge)
            : null,
          airportFee: item.Airport_fee ? Number(item.Airport_fee) : null,
          ehailFee: item.ehail_fee ? Number(item.ehail_fee) : null,
        };
      })
    )
    .onConflictDoNothing({
      target: [
        yellowTaxiTripRecords.tpepDropoffDatetime,
        yellowTaxiTripRecords.tpepPickupDatetime,
        yellowTaxiTripRecords.puLocationId,
        yellowTaxiTripRecords.doLocationId,
      ],
    });
}

export async function processGreenTaxiTripRecordsBatch(
  batch: GreenTaxiTripCsvRecord[]
) {
  console.log("Processing batch...");
  await db
    .insert(greenTaxiTripRecords)
    .values(
      batch.map((item) => ({
        vendorId: Number(item.VendorID),
        lpepPickupDatetime: moment(item.lpep_pickup_datetime).toDate(),
        lpepDropoffDatetime: moment(item.lpep_dropoff_datetime).toDate(),
        puLocationId: Number(item.PULocationID),
        doLocationId: Number(item.DOLocationID),
        storeAndFwdFlag: item.store_and_fwd_flag
          ? item.store_and_fwd_flag
          : null,
        rateCodeId: Number(item.RatecodeID),
        passengerCount: Number(item.passenger_count),
        tripDistance: Number(item.trip_distance),
        fareAmount: Number(item.fare_amount),
        extra: Number(item.extra),
        mtaTax: Number(item.mta_tax),
        tipAmount: Number(item.tip_amount),
        tollsAmount: Number(item.tolls_amount),
        improvementSurcharge: Number(item.improvement_surcharge),
        totalAmount: Number(item.total_amount),
        paymentType: Number(item.payment_type),
        ehailFee: item.ehail_fee ? Number(item.ehail_fee) : null,
        tripType: item.trip_type ? Number(item.trip_type) : null,
        congestionSurcharge: item.congestion_surcharge
          ? Number(item.congestion_surcharge)
          : null,
        airportFee: item.Airport_fee ? Number(item.Airport_fee) : null,
      }))
    )
    .onConflictDoNothing({
      target: [
        greenTaxiTripRecords.lpepDropoffDatetime,
        greenTaxiTripRecords.lpepPickupDatetime,
        greenTaxiTripRecords.puLocationId,
        greenTaxiTripRecords.doLocationId,
      ],
    });
}

export function processCSV<T>(
  batchHandler: (batch: T[]) => Promise<void>,
  zodSchema: ZodSchema
) {
  return async (filename: string) => {
    const stream = await getS3ObjectStream(filename);
    const batch: Record<string, any>[] = [];
    let isFirstRow = true;

    await pipeline(stream.pipe(csv()), async function* (source) {
      for await (const row of source) {
        if (isFirstRow) {
          console.log(row);
          isFirstRow = false;
          const result = zodSchema.safeParse(row);
          if (!result.success) {
            console.log(result.error);
            throw new Error("Invalid CSV");
          }
        }

        batch.push(row);
        if (batch.length === BATCH_SIZE) {
          await batchHandler(batch.splice(0, BATCH_SIZE) as T[]);
        }
      }
    });

    if (batch.length > 0) {
      await batchHandler(batch as T[]);
    }
    // return new Promise((resolve, reject) => {
    //   try {

    //     stream
    //       .pipe(csv())
    //       .on("data", (row) => {
    //         const result = zodSchema.safeParse(row);
    //         if (!result.success) reject(new Error("Invalid CSV"));

    //         batch.push(row);
    //         if (batch.length === BATCH_SIZE) {
    //           batchHandler(batch.splice(0, BATCH_SIZE) as T[]).catch(reject);
    //         }
    //       })
    //       .on("end", () => {
    //         if (batch.length) batchHandler(batch as T[]).catch(reject);
    //         resolve(true);
    //       })
    //       .on("error", (error) => {
    //         reject(error);
    //       });
    //   } catch (error) {
    //     reject(error);
    //   }
    // });
  };
}

export const fhvCsvParser = processCSV<FHVTripCsvRecord>(
  processFHVTripRecordsBatch,
  fhvTripRecordCsvZodSchema
);
export const taxiZoneLookupParser = processCSV<TaxiZoneLookupCsvRecord>(
  processTaxiZoneLookupBatch,
  taxiZoneLookupCsvZodSchema
);

export const hvfhvCsvParser = processCSV<HVFHVTripCsvRecord>(
  processHVFHVTripRecordsBatch,
  hvfhvTripRecordCsvZodSchema
);

export const greenTaxiTripRecordsParser = processCSV<GreenTaxiTripCsvRecord>(
  processGreenTaxiTripRecordsBatch,
  greenTaxiTripRecordCsvZodSchema
);

export const yellowTaxiTripRecordsParser = processCSV<YellowTaxiTripCsvRecord>(
  processYellowTaxiTripRecordsBatch,
  yellowTaxiTripRecordCsvZodSchema
);
