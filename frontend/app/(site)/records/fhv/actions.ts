"use server";

import { api } from "@/lib/api";
import { processRestApiResponse } from "@/lib/utils";
import { FVHTripRecords } from "@/types/api/records";

interface RecordsParameters {
  per_page?: number;
  page?: number;
  withCount?: boolean;
}
export async function getAll({
  per_page,
  page,
  withCount = false,
}: RecordsParameters) {
  const queryParams = [];

  if (per_page) queryParams.push(`per_page=${per_page}`);
  if (page) queryParams.push(`page=${page}`);
  if (withCount) queryParams.push(`include_count=${withCount}`);

  const response = await api(`/records/fhv?${queryParams.join("&")}`, {
    method: "GET",
  });

  return await processRestApiResponse<{
    data: FVHTripRecords[];
    pageCount: number;
  }>(response);
}

export async function uploadCSV(key: string, fileName: string) {
  const response = await api(`/records/fhv/upload`, {
    method: "POST",
    body: JSON.stringify({ key, file_name: fileName }),
  });

  return await processRestApiResponse(response);
}
