import { z } from "zod";

export const fhvTripRecordCsvZodSchema = z
  .object({
    dispatching_base_num: z.string(),
    pickup_datetime: z.string(),
    dropOff_datetime: z.string(),
    PUlocationID: z.string(),
    DOlocationID: z.string(),
    SR_Flag: z.string(),
    Affiliated_base_number: z.string(),
  })
  .strict();

export const hvfhvTripRecordCsvZodSchema = z
  .object({
    Hvfhs_license_num: z.string(),
    Dispatching_base_num: z.string(),
    Pickup_datetime: z.string(),
    DropOff_datetime: z.string(),
    PUlocationID: z.string(),
    DOlocationID: z.string(),
    originating_base_num: z.string(),
    request_datetime: z.string(),
    on_scene_datetime: z.string(),
    trip_miles: z.string(),
    trip_time: z.string(),
    base_passenger_fare: z.string(),
    tolls: z.string(),
    bcf: z.string(),
    sales_tax: z.string(),
    congestion_surcharge: z.string(),
    airport_fee: z.string(),
    tips: z.string(),
    driver_pay: z.string(),
    shared_request_flag: z.string(),
    shared_match_flag: z.string(),
    access_a_ride_flag: z.string(),
    wav_request_flag: z.string(),
    wav_match_flag: z.string(),
  })
  .strict();

export const taxiZoneLookupCsvZodSchema = z
  .object({
    LocationID: z.string(),
    Borough: z.string(),
    Zone: z.string(),
    service_zone: z.string(),
  })
  .strict();

export const greenTaxiTripRecordCsvZodSchema = z
  .object({
    VendorID: z.string(),
    lpep_pickup_datetime: z.string(),
    lpep_dropoff_datetime: z.string(),
    store_and_fwd_flag: z.enum(["Y", "N", ""]),
    RatecodeID: z.string(),
    PULocationID: z.string(),
    DOLocationID: z.string(),
    passenger_count: z.string(),
    trip_distance: z.string(),
    fare_amount: z.string(),
    extra: z.string(),
    mta_tax: z.string(),
    tip_amount: z.string(),
    tolls_amount: z.string(),
    improvement_surcharge: z.string(),
    total_amount: z.string(),
    payment_type: z.string(),
    ehail_fee: z.string().optional(),
    trip_type: z.string().optional(),
    congestion_surcharge: z.string().optional(),
    Airport_fee: z.string().optional(),
  })
  .strict();

export const yellowTaxiTripRecordCsvZodSchema = z
  .object({
    VendorID: z.string(),
    tpep_pickup_datetime: z.string(),
    tpep_dropoff_datetime: z.string(),
    store_and_fwd_flag: z.enum(["Y", "N", ""]),
    RatecodeID: z.string(),
    PULocationID: z.string(),
    DOLocationID: z.string(),
    passenger_count: z.string(),
    trip_distance: z.string(),
    fare_amount: z.string(),
    extra: z.string(),
    mta_tax: z.string(),
    tip_amount: z.string(),
    tolls_amount: z.string(),
    improvement_surcharge: z.string(),
    total_amount: z.string(),
    payment_type: z.string(),
    ehail_fee: z.string().optional(),
    trip_type: z.string().optional(),
    congestion_surcharge: z.string().optional(),
    Airport_fee: z.string().optional(),
  })
  .strict();
