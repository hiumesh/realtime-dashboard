"use server";

import { api } from "@/lib/api";
import { processRestApiResponse } from "@/lib/utils";

interface SearchParameters {
  perPage?: number;
  page?: number;
  withCount?: boolean;
}
export async function getAll({
  perPage,
  page,
  withCount = false,
}: SearchParameters) {
  const queryParams = [];

  if (perPage) queryParams.push(`page_size=${perPage}`);
  if (page) queryParams.push(`page=${page}`);
  if (withCount) queryParams.push(`include_count=${withCount}`);

  const response = await api(`/users?${queryParams.join("&")}`, {
    method: "GET",
  });

  return await processRestApiResponse<{
    data: User[];
    pageCount: number;
  }>(response);
}

export async function updateRole(body: unknown) {
  const response = await api(`/users/role`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return await processRestApiResponse(response);
}
