import express, { type Request, type Response } from "express";
import { prisma } from "./prisma/prisma.js";
import { redis } from "./redis/redis.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(loggerMiddleware);

// API endpoints
app.use("/api/auth", authRouter);

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
