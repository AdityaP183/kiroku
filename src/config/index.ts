import { config } from "dotenv";
import { z } from "zod";

config({
    quiet: true,
});

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(8000),

    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),

    DATABASE_URL: z.url(),
});

export const envConfig = envSchema.parse(process.env);
