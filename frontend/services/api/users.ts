"use server";

import { processRestApiResponse } from "@/lib/utils";
import { api } from "@/lib/api";
import { verifySession } from "@/lib/session";

export async function getProfile() {
  const response = await api(`/users/profile`);

  const data = await processRestApiResponse<UserProfile>(response);

  return data;
}

export async function getSession() {
  const session = await verifySession();
  return session;
}

export async function getPreSignedUrl(filename: string, fileType: string) {
  const response = await api(`/users/signed-url`, {
    method: "POST",
    body: JSON.stringify({ file_name: filename, file_type: fileType }),
  });

  return await processRestApiResponse<{ url: string; key: string }>(response);
}

export async function getNotifications() {
  const response = await api(`/users/notifications`);
  return await processRestApiResponse<Notification[]>(response);
}
