import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { prisma } from "./prisma/prisma.js";
import { redis } from "./redis/redis.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import roomRouter from "./modules/room/room.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);

// API endpoints
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomRouter);

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

// error-middleware
app.use(errorMiddleware);
export default app;
