import dotenv from "dotenv";
import { initRESTServer } from "./api/app";
import { initWorkers } from "./worker";
import { initSocketServer } from "./socket.io";

dotenv.config();

console.log(process.env.DATABASE_URL);

function main() {
  const server = initRESTServer();
  initSocketServer(server);
  initWorkers();
}

main();
