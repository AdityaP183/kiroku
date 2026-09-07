import { and, desc, eq } from "drizzle-orm";
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from "../../constants/http.js";
import { db } from "../../db/db.js";
import { usersTable } from "../../db/schema/users.js";
import { AppError } from "../../utils/errors/app-error.js";
import type { UpdateUserInput } from "./users.schema.js";
import { accountDeletionRequestsTable } from "../../db/schema/account-deletion-requests.schema.js";

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

async function handleUpdateUser(payload: UpdateUserInput, userId: string) {
    const updatedUser = await db
        .update(usersTable)
        .set({
            firstName: payload.firstName,
            lastName: payload.lastName,
            image: payload.image,
        })
        .where(eq(usersTable.id, userId))
        .returning();
    if (updatedUser.length === 0) {
        throw new AppError(
            "User not found",
            HTTP_STATUS.NOT_FOUND,
            HTTP_STATUS_MESSAGE.NOT_FOUND,
        );
    }

    return updatedUser[0];
}

async function handleUserDeletionRequest(
    userId: string,
    userDeletionTableId: string,
) {
    const existingRequest = await db
        .select()
        .from(accountDeletionRequestsTable)
        .where(
            and(
                eq(accountDeletionRequestsTable.userId, userId),
                eq(accountDeletionRequestsTable.status, "pending"),
            ),
        )
        .limit(1);
    if (existingRequest.length > 0) {
        throw new AppError(
            "An account deletion request is already pending",
            HTTP_STATUS.CONFLICT,
            HTTP_STATUS_MESSAGE.CONFLICT,
        );
    }

    const deletionRequest = await db
        .insert(accountDeletionRequestsTable)
        .values({
            id: userDeletionTableId,
            userId,
        })
        .returning();
    if (deletionRequest.length === 0) {
        throw new AppError(
            "Failed to create account deletion request",
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            HTTP_STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
        );
    }

    return deletionRequest[0];
}

async function handleGetAllUserDeletionRequests(userId: string) {
    const deletionRequests = await db
        .select()
        .from(accountDeletionRequestsTable)
        .where(eq(accountDeletionRequestsTable.userId, userId))
        .orderBy(desc(accountDeletionRequestsTable.createdAt));
    if (deletionRequests.length === 0) {
        throw new AppError(
            "Account deletion requests not found",
            HTTP_STATUS.NOT_FOUND,
            HTTP_STATUS_MESSAGE.NOT_FOUND,
        );
    }

    return deletionRequests;
}

export {
    getUserById,
    handleUpdateUser,
    handleUserDeletionRequest,
    handleGetAllUserDeletionRequests,
};
