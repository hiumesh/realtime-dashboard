import { Response } from "express";
import { handleControllerError, sendSuccessResponse } from "../utils/response";
import { DashboardGetRequest } from "@/types/api/requests";
import {
  paymentMethodDistributionFhvTripRecords,
  paymentMethodDistributionGreenTaxiTripRecords,
  paymentMethodDistributionHvFhvTripRecords,
  paymentMethodDistributionYellowTaxiTripRecords,
  totalTripsPerDayOrMonthByVehicleType,
} from "../services/dashboard";
import db from "@/db";

export default async function dashboard(
  req: DashboardGetRequest,
  res: Response
) {
  try {
    let data = [];

    switch (req.params.chart) {
      case "trips_per_month":
        data = await totalTripsPerDayOrMonthByVehicleType({ db: db });
        break;
      case "payment_distribution_green":
        data = await paymentMethodDistributionGreenTaxiTripRecords({ db: db });
        break;
      case "payment_distribution_yellow":
        data = await paymentMethodDistributionYellowTaxiTripRecords({ db: db });
        break;
      case "payment_distribution_hvfhv":
        data = await paymentMethodDistributionHvFhvTripRecords({ db: db });
        break;
      case "payment_distribution_fhv":
        data = await paymentMethodDistributionFhvTripRecords({ db: db });
        break;
      default:
        throw new Error("Invalid chart type");
    }

    sendSuccessResponse({
      res,
      status: 200,
      message: "Dashboard fetched successfully",
      data,
    });
  } catch (error) {
    handleControllerError({ error, res });
  }
}
