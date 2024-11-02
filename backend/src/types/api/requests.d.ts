import { Request } from "express";
import { z } from "zod";

import { signupRequestSchema, tokenRequestSchema } from "@/api/schemas/auth";
import {
  getPreSignedUrlSchema,
  updateRoleRequestSchema,
} from "@/api/schemas/users";
import {
  countRecordsRequestSchema,
  findRecordsRequestSchema,
  findUsersRequestSchema,
  uploadRecordsUsingCSVRequestSchema,
} from "@/api/schemas/records";
import { dashboardRequestSchema } from "@/api/schemas/dashboard";

export type TokenRequest = Request<
  z.infer<typeof tokenRequestSchema>["params"],
  any,
  z.infer<typeof tokenRequestSchema>["body"],
  z.infer<typeof tokenRequestSchema>["query"]
>;

export type SignupRequest = Request<
  z.infer<typeof signupRequestSchema>["params"],
  any,
  z.infer<typeof signupRequestSchema>["body"],
  z.infer<typeof signupRequestSchema>["query"]
>;

export type GetPreSignedUrlRequest = Request<
  z.infer<typeof getPreSignedUrlSchema>["params"],
  any,
  z.infer<typeof getPreSignedUrlSchema>["body"],
  z.infer<typeof getPreSignedUrlSchema>["query"]
>;

export type FindRecordsRequest = Request<
  z.infer<typeof findRecordsRequestSchema>["params"],
  any,
  z.infer<typeof findRecordsRequestSchema>["body"],
  z.infer<typeof findRecordsRequestSchema>["query"]
>;

export type CountRecordsRequest = Request<
  z.infer<typeof countRecordsRequestSchema>["params"],
  any,
  z.infer<typeof countRecordsRequestSchema>["body"],
  z.infer<typeof countRecordsRequestSchema>["query"]
>;

export type UploadRecordsUsingCSVRequest = Request<
  z.infer<typeof uploadRecordsUsingCSVRequestSchema>["params"],
  any,
  z.infer<typeof uploadRecordsUsingCSVRequestSchema>["body"],
  z.infer<typeof uploadRecordsUsingCSVRequestSchema>["query"]
>;

export type DashboardGetRequest = Request<
  z.infer<typeof dashboardRequestSchema>["params"],
  any,
  z.infer<typeof dashboardRequestSchema>["body"],
  z.infer<typeof dashboardRequestSchema>["query"]
>;

export type FindUsersRequest = Request<
  z.infer<typeof findUsersRequestSchema>["params"],
  any,
  z.infer<typeof findUsersRequestSchema>["body"],
  z.infer<typeof findUsersRequestSchema>["query"]
>;

export type UpdateUserRoleRequest = Request<
  z.infer<typeof updateRoleRequestSchema>["params"],
  any,
  z.infer<typeof updateRoleRequestSchema>["body"],
  z.infer<typeof updateRoleRequestSchema>["query"]
>;
