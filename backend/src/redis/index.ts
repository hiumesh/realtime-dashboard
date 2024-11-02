import { createClient } from "redis";

export async function getRedisClient() {
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  await redisClient.connect();
  return redisClient;
}
