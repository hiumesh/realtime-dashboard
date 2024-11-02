import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
// import { sessions } from "./schema/sessions";

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
});

// const hello = async () => {
//   const session = await db.select().from(sessions).limit(1);
//   console.log(session);
// };

// hello();

export default db;
