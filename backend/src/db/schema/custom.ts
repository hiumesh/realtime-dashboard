import { sql } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export const up = async (db: PostgresJsDatabase) => {
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS plpython3u;`);
  await db.execute(
    sql`
      CREATE OR REPLACE FUNCTION notify_redis()
      RETURNS TRIGGER AS $$
      import redis
      # Use the environment variables loaded from .env
      redis_host = '${process.env.REDIS_HOST}'
      redis_port = ${process.env.REDIS_PORT}

      r = redis.StrictRedis(host=redis_host, port=int(redis_port), db=0)
      message = f"Data changed in table {TG_TABLE_NAME}: {TG_OP}"
      r.publish('table_update', message)
      return NEW
      $$ LANGUAGE plpython3u;
    `
  );
};
