import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { envConfig } from "../config/index.js";
import { logger } from "../logger/logger.js";

const pool = new Pool({
    connectionString: envConfig.DATABASE_URL,
});

try {
    await pool.query("SELECT 1");

    logger.info("database", "Database connected successfully");
} catch (error) {
    logger.error(
        "database",
        `Database connection failed: ${
            error instanceof Error ? error.message : "Unknown error"
        }`,
    );

    process.exit(1);
}

export const db = drizzle({ client: pool });
