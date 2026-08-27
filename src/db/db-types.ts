import type { accountsTable } from "./schema/accounts.js";
import type { usersTable } from "./schema/users.js";

export type User = typeof usersTable.$inferSelect;
export type Account = typeof accountsTable.$inferSelect;
