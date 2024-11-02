import { z } from "zod";

export const tokenRequestSchema = z
  .object({
    query: z
      .object({
        grant_type: z.enum(["password", "refresh_token"]),
      })
      .strict(),
    params: z.object({}).strict(),
    body: z
      .object({
        email: z.string().email().optional(),
        password: z.string().optional(),
      })
      .strict(),
  })
  .superRefine((val, ctx) => {
    if (val.query.grant_type === "password") {
      if (!val.body.email || !val.body.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email and Password are required.",
          path: ["body"],
        });
      }
    }
  });

export const signupRequestSchema = z
  .object({
    query: z.object({}).strict(),
    params: z.object({}).strict(),
    body: z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .required()
      .strict(),
  })
  .superRefine((val, ctx) => {
    if (!val.body.email || !val.body.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email and Password are required.",
        path: ["body"],
      });
    }
  });
