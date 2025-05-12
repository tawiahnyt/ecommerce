/** @format */

import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "./generated/prisma";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
