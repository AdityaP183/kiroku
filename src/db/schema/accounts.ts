import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.js";

export const accountsTable = pgTable("accounts", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    issuer: text("issuer").notNull(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
        precision: 6,
        withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
        precision: 6,
        withTimezone: true,
    }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    createdAt: timestamp("created_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
    updatedAt: timestamp("updated_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
});
