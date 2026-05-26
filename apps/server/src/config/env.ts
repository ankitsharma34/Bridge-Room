import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  PORT: z.coerce.number().default(5000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
