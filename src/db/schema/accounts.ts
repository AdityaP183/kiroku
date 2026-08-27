import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.js";

export const accountsTable = pgTable("accounts", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerId: text("provider_id").notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});
