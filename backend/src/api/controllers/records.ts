import {
  CountRecordsRequest,
  FindRecordsRequest,
  UploadRecordsUsingCSVRequest,
} from "@/types/api/requests";
import { Response } from "express";
import { handleControllerError, sendSuccessResponse } from "../utils/response";
import {
  countAllFHVTripRecords,
  findAllFHVTripRecords,
} from "../services/fhv-trip-records";
import db from "@/db";
import {
  countAllGreenTaxiTripRecords,
  findAllGreenTaxiTripRecords,
} from "../services/green-taxi-trip-records";
import {
  countAllYellowTaxiTripRecords,
  findAllYellowTaxiTripRecords,
} from "../services/yellow-taxi-trip-records";
import {
  countAllHVFHVTripRecords,
  findAllHVFHVTripRecords,
} from "../services/hvfhv-trip-records";
import { csvProcessingQueue } from "@/queue";
import {
  countAllTaxiZoneLookupRecords,
  findAllTaxiZoneLookupRecords,
} from "../services/taxi-zone-lookup";

export async function findAll(req: FindRecordsRequest, res: Response) {
  try {
    let data;
    let count = undefined;
    switch (req.params.module_name) {
      case "fhv":
        data = await findAllFHVTripRecords({
          page: req.query.page,
          pageSize: req.query.page_size,
          db,
        });
        if (req.query.include_count) {
          count = await countAllFHVTripRecords(db);
        }
        break;
      case "green":
        data = await findAllGreenTaxiTripRecords({
          page: req.query.page,
          pageSize: req.query.page_size,
          db,
        });
        if (req.query.include_count) {
          count = await countAllGreenTaxiTripRecords(db);
        }
        break;
      case "yellow":
        data = await findAllYellowTaxiTripRecords({
          page: req.query.page,
          pageSize: req.query.page_size,
          db,
        });
        if (req.query.include_count) {
          count = await countAllYellowTaxiTripRecords(db);
        }
        break;
      case "hvfhv":
        data = await findAllHVFHVTripRecords({
          page: req.query.page,
          pageSize: req.query.page_size,
          db,
        });
        if (req.query.include_count) {
          count = await countAllHVFHVTripRecords(db);
        }
        break;
      case "zone":
        data = await findAllTaxiZoneLookupRecords({
          page: req.query.page,
          pageSize: req.query.page_size,
          db,
        });
        if (req.query.include_count) {
          count = await countAllTaxiZoneLookupRecords(db);
        }
        break;
      default:
        throw new Error("Invalid module name");
    }

    sendSuccessResponse({
      res,
      status: 200,
      message: "Records fetched successfully",
      data: {
        data,
        pageCount: count
          ? Math.ceil(
              count / (req.query.page_size ? Number(req.query.page_size) : 20)
            )
          : undefined,
      },
    });
  } catch (error) {
    handleControllerError({ error, res });
  }
}

export async function count(req: CountRecordsRequest, res: Response) {
  try {
    let count;
    switch (req.params.module_name) {
      case "fhv":
        count = await countAllFHVTripRecords(db);
        break;
      case "green":
        count = await countAllGreenTaxiTripRecords(db);
        break;
      case "yellow":
        count = await countAllYellowTaxiTripRecords(db);
        break;
      case "hvfhv":
        count = await countAllHVFHVTripRecords(db);
        break;
      case "zone":
        count = await countAllTaxiZoneLookupRecords(db);
        break;
      default:
        throw new Error("Invalid module name");
    }

    sendSuccessResponse({
      res,
      status: 200,
      message: "Records count fetched successfully",
      data: { count },
    });
  } catch (error) {
    handleControllerError({ error, res });
  }
}

export async function upload(req: UploadRecordsUsingCSVRequest, res: Response) {
  try {
    const data = { ...req.body, user_id: req.user.user_id };
    switch (req.params.module_name) {
      case "fhv":
        csvProcessingQueue.add("fhv-csv-processing", data);
        break;
      case "green":
        csvProcessingQueue.add("green-csv-processing", data);
        break;
      case "yellow":
        csvProcessingQueue.add("yellow-csv-processing", data);
        break;
      case "hvfhv":
        csvProcessingQueue.add("hvfhv-csv-processing", data);
        break;
      case "zone":
        csvProcessingQueue.add("taxi-zone-lookup-csv-processing", data);
        break;
      default:
        throw new Error("Invalid module name");
    }

    sendSuccessResponse({
      res,
      status: 200,
      message: "Records uploaded successfully",
    });
  } catch (error) {
    handleControllerError({ error, res });
  }
}
