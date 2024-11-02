"use server";

import { api } from "@/lib/api";
import { processRestApiResponse } from "@/lib/utils";

export async function getChartData(
  chart:
    | "trips_per_month"
    | "payment_distribution_green"
    | "payment_distribution_hvfhv"
    | "payment_distribution_yellow"
    | "payment_distribution_fhv"
    | "payment_distribution_green"
    | "payment_distribution_zone"
) {
  const response = await api(`/dashboard/${chart}`);
  return await processRestApiResponse(response);
}
