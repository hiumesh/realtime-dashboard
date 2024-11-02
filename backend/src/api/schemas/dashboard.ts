import { z } from "zod";

export const dashboardRequestSchema = z
  .object({
    query: z.object({}).strict(),
    params: z
      .object({
        chart: z.enum([
          "trips_per_month",
          "payment_distribution_green",
          "payment_distribution_yellow",
          "payment_distribution_hvfhv",
          "payment_distribution_fhv",
        ]),
      })
      .strict(),
    body: z.object({}).strict(),
  })
  .strict();
