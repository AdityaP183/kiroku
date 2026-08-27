import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from "../../constants/http.js";
import { db } from "../../db/db.js";
import { accountsTable } from "../../db/schema/accounts.js";
import { sessionsTable } from "../../db/schema/sessions.js";
import { usersTable } from "../../db/schema/users.js";
import { AppError } from "../../utils/errors/app-error.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import type { CreateUserInput, LoginUserInput } from "./auth.schema.js";

async function handleRegisterUser(
    payload: CreateUserInput,
    userId: string,
    refreshToken: string,
    ipAddress: string,
    userAgent: string | null,
) {
    const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, payload.email));
    if (existingUser.length > 0) {
        throw new AppError(
            "A user with this email already exists",
            HTTP_STATUS.CONFLICT,
            HTTP_STATUS_MESSAGE.CONFLICT,
        );
    }

    const hashedPassword = await hashPassword(payload.password);

    const newUser = await db.transaction(async (tx) => {
        const [user] = await tx
            .insert(usersTable)
            .values({
                id: userId,
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                image: payload.image ?? null,
            })
            .returning();

        await tx.insert(accountsTable).values({
            id: randomUUID(),
            userId,
            provider: "credentials",
            providerId: payload.email,
            password: hashedPassword,
        });

        await tx.insert(sessionsTable).values({
            id: randomUUID(),
            userId,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            ipAddress,
            userAgent,
        });

        return user;
    });

    return newUser;
}

async function handleLoginUser(
    payload: LoginUserInput,
    refreshToken: string,
    ipAddress: string,
    userAgent: string | null,
) {
    const userWithAccount = await db
        .select()
        .from(usersTable)
        .innerJoin(accountsTable, eq(accountsTable.providerId, payload.email))
        .where(eq(usersTable.email, payload.email));

    const result = userWithAccount[0];
    if (!result) {
        throw new AppError(
            "Email or password invalid!",
            HTTP_STATUS.UNAUTHORIZED,
            HTTP_STATUS_MESSAGE.UNAUTHORIZED,
        );
    }

    const { users, accounts } = result;

    const isPasswordCorrect = await verifyPassword(
        accounts.password,
        payload.password,
    );
    if (!isPasswordCorrect) {
        throw new AppError(
            "Email or password invalid!",
            HTTP_STATUS.UNAUTHORIZED,
            HTTP_STATUS_MESSAGE.UNAUTHORIZED,
        );
    }

    await db.insert(sessionsTable).values({
        id: randomUUID(),
        userId: users.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        ipAddress,
        userAgent,
    });

    return users;
}

async function handleLogoutUser(refreshToken: string) {
    await db.delete(sessionsTable).where(eq(sessionsTable.token, refreshToken));
}

async function handleRefreshUserToken(refreshToken: string) {
    const [session] = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.token, refreshToken));

    if (!session || session.expiresAt < new Date()) {
        throw new AppError(
            "Session expired. Please log in again",
            HTTP_STATUS.UNAUTHORIZED,
            HTTP_STATUS_MESSAGE.UNAUTHORIZED,
        );
    }

    return session;
}

export {
    handleLoginUser,
    handleRegisterUser,
    handleLogoutUser,
    handleRefreshUserToken,
};
