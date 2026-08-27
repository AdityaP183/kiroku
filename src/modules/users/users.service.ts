import { eq } from "drizzle-orm";
import { db } from "../../db/db.js";
import { usersTable } from "../../db/schema/users.js";
import { AppError } from "../../utils/errors/app-error.js";
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from "../../constants/http.js";

async function getUserById(userId: string) {
    const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId));
    if (user.length === 0) {
        throw new AppError(
            "User not found",
            HTTP_STATUS.NOT_FOUND,
            HTTP_STATUS_MESSAGE.NOT_FOUND,
        );
    }

    return user[0];
}

export { getUserById };
