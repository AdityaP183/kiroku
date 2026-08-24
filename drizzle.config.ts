import { defineConfig } from "drizzle-kit";
import { envConfig } from "./src/config/index";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: envConfig.DATABASE_URL,
    },
});
