import "dotenv/config";

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  PORT: Number(process.env.PORT ?? 5000),
  REDIS_URL: process.env.REDIS_URL!,
};
