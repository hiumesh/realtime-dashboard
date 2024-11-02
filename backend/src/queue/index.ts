import { Queue } from "bullmq";

export const csvProcessingQueue = new Queue("csv-processing", {
  connection: {
    url: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});
