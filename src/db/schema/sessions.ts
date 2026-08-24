import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users.js";

export const sessionsTable = pgTable("sessions", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: timestamp("expires_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});
