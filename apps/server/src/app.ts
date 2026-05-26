import express, { type Request, type Response } from "express";
import { prisma } from "./prisma/prisma.js";
import { redis } from "./redis/redis.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";

const app = express();

app.use(loggerMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "BrideRoom API is running.",
  });
});

app.get("/api/health", async (req: Request, res: Response) => {
  await prisma.$queryRaw`SELECT 1`;
  await redis.ping();
  res.json({
    success: true,
    database: "connected",
    redis: "connected",
  });
});
export default app;
