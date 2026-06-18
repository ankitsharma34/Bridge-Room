import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
});

const env = envSchema.parse(process.env);
export default env;
