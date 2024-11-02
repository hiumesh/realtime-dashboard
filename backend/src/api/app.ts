import express, { Request, Response, Application } from "express";
import cors from "cors";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes";
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./controllers/auth";

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.all("*", router);

app.use(notFound);
app.use(errorHandler);

export function initRESTServer() {
  const server = createServer(app);

  server.listen(port, () => {
    console.log(`REST Server is Fire at http://localhost:${port}`);
  });

  return server;
}
