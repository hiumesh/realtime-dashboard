"use server";

import { api } from "@/lib/api";
import { processRestApiResponse } from "@/lib/utils";
import { YellowTripRecords } from "@/types/api/records";

interface LookupParameters {
  perPage?: number;
  page?: number;
  withCount?: boolean;
}
export async function getAll({
  perPage,
  page,
  withCount = false,
}: LookupParameters) {
  const queryParams = [];

  if (perPage) queryParams.push(`page_size=${perPage}`);
  if (page) queryParams.push(`page=${page}`);
  if (withCount) queryParams.push(`include_count=${withCount}`);

  const response = await api(`/records/yellow?${queryParams.join("&")}`, {
    method: "GET",
  });

  return await processRestApiResponse<{
    data: YellowTripRecords[];
    pageCount: number;
  }>(response);
}

export async function uploadCSV(key: string, fileName: string) {
  const response = await api(`/records/yellow/upload`, {
    method: "POST",
    body: JSON.stringify({ key, file_name: fileName }),
  });

  return await processRestApiResponse(response);
}
