import { v4 as uuidv4 } from "uuid";

export function generateUniqueFileName(name: string): string {
  const uuid = uuidv4();
  return `${uuid}-${name.replace(/\s/g, "-")}`;
}
