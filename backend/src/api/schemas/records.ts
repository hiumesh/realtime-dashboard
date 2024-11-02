import { z } from "zod";

export const findRecordsRequestSchema = z.object({
  query: z
    .object({
      page: z
        .string()
        .refine((value) => /^\d+$/.test(value), {
          message: "String must be a whole number.",
        })
        .optional(),
      page_size: z
        .string()
        .refine((value) => /^\d+$/.test(value), {
          message: "String must be a whole number.",
        })
        .optional(),
      include_count: z.enum(["true", "false"]).optional(),
    })
    .strict(),
  params: z
    .object({
      module_name: z.enum(["fhv", "green", "yellow", "hvfhv", "zone"]),
    })
    .strict(),
  body: z.object({}).strict(),
});

export const countRecordsRequestSchema = z.object({
  query: z.object({}).strict(),
  params: z
    .object({
      module_name: z.enum(["fhv", "green", "yellow", "hvfhv", "zone"]),
    })
    .strict(),
  body: z.object({}).strict(),
});

export const uploadRecordsUsingCSVRequestSchema = z.object({
  query: z.object({}).strict(),
  params: z
    .object({
      module_name: z.enum(["fhv", "green", "yellow", "hvfhv", "zone"]),
    })
    .strict(),
  body: z
    .object({
      key: z.string(),
      file_name: z.string().min(1).max(255),
    })
    .strict(),
});
