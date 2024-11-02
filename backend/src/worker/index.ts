import { Job, Worker } from "bullmq";
import {
  fhvCsvParser,
  greenTaxiTripRecordsParser,
  hvfhvCsvParser,
  taxiZoneLookupParser,
  yellowTaxiTripRecordsParser,
} from "./csv-parser";
import { removeS3Object } from "@/utils/s3";
import { createNotification } from "@/api/services/notifications";
import db from "@/db";
import {
  broadcastDatabaseChanges,
  emitNewNotificationToUser,
} from "@/socket.io/services";

const jobNameToTableNameMap: Record<string, string> = {
  "taxi-zone-lookup-csv-processing": "taxi_zone_lookup",
  "fhv-csv-processing": "fhv_trip_records",
  "green-csv-processing": "green_taxi_trip_records",
  "yellow-csv-processing": "yellow_taxi_trip_records",
  "hvfhv-csv-processing": "hvfhv_trip_records",
};

export class CsvProcessingWorker extends Worker {
  constructor() {
    super(
      "csv-processing",
      async (job) => {
        if (job.name === "taxi-zone-lookup-csv-processing") {
          console.log(`Processing ${job.name}...`);
          await taxiZoneLookupParser(job.data.key);
        }
        if (job.name === "fhv-csv-processing") {
          console.log(`Processing ${job.name}...`);
          await fhvCsvParser(job.data.key);
        }
        if (job.name === "green-csv-processing") {
          console.log(`Processing ${job.name}...`);
          await greenTaxiTripRecordsParser(job.data.key);
        }
        if (job.name === "yellow-csv-processing") {
          console.log(`Processing ${job.name}...`);
          await yellowTaxiTripRecordsParser(job.data.key);
        }
        if (job.name === "hvfhv-csv-processing") {
          console.log(`Processing ${job.name}...`);
          await hvfhvCsvParser(job.data.key);
        }
      },
      {
        connection: {
          url: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      }
    );

    this.on("completed", async (job: Job, returnvalue: any) => {
      try {
        removeS3Object(job?.data.key).catch((e) => console.log(e));
        const notification = await createNotification({
          userId: job?.data.user_id,
          type: "success",
          body: `CSV processing of file "${job?.data.file_name}" is successful.`,
          db: db,
        });
        emitNewNotificationToUser(job?.data?.user_id, notification);
        broadcastDatabaseChanges({
          operation: "create",
          affected_tables:
            job?.name in jobNameToTableNameMap
              ? [jobNameToTableNameMap[job?.name]]
              : [],
        });
        console.log(`Job ${job?.name} completed with value: ${returnvalue}`);
      } catch (error) {
        console.log(error);
      }
    });

    this.on(
      "failed",
      async (job: Job | undefined, error: Error, prev: string) => {
        try {
          removeS3Object(job?.data.key).catch((e) => console.log(e));
          const notification = await createNotification({
            userId: job?.data.user_id,
            type: "error",
            body: `CSV processing of file "${job?.data.file_name}" failed with error: ${error.message}`,
            db: db,
          });
          emitNewNotificationToUser(job?.data?.user_id, notification);
          console.log(
            `Job ${job?.name} failed with error: ${error.message} and prev: ${prev}`
          );
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
}

export const initWorkers = () => {
  new CsvProcessingWorker();
};
