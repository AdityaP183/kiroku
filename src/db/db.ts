import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { envConfig } from "../config/index.js";

const pool = new Pool({
    connectionString: envConfig.DATABASE_URL,
});

export const db = drizzle({ client: pool });
