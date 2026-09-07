import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.js";

export const accountDeletionRequestStatusEnum = pgEnum(
    "account_deletion_request_status",
    ["pending", "approved", "rejected"],
);

export const accountDeletionRequestsTable = pgTable(
    "account_deletion_requests",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),
        status: accountDeletionRequestStatusEnum("status")
            .notNull()
            .default("pending"),
        createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
    },
);
