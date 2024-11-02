import { z } from "zod";

export const getPreSignedUrlSchema = z.object({
  query: z.object({}).strict(),
  params: z.object({}).strict(),
  body: z
    .object({
      file_name: z.string().min(1).max(255),
      file_type: z.string().min(1).max(255),
    })
    .strict(),
});

export const findUsersRequestSchema = z.object({
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
  params: z.object({}).strict(),
  body: z.object({}).strict(),
});

export const updateRoleRequestSchema = z.object({
  query: z.object({}).strict(),
  params: z.object({}).strict(),
  body: z
    .object({
      role: z.enum(["manager", "user"]),
      user_id: z.string(),
    })
    .strict(),
});
