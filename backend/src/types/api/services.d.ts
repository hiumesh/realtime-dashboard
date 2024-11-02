import { sessions } from "@/db/schema/sessions";
import { InferSelectModel } from "drizzle-orm";

export interface UserCredentials {
  email: string;
  password: string;
}
