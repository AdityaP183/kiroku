import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: text("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    image: text("image"),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});
