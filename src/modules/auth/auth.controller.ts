import type { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from "../../constants/http.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookies.js";
import { AppError } from "../../utils/errors/app-error.js";
import { response } from "../../utils/response.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/tokens.js";
import { createUserSchema, loginUserSchema } from "./auth.schema.js";
import {
    handleLoginUser,
    handleLogoutUser,
    handleRefreshUserToken,
    handleRegisterUser,
} from "./auth.service.js";

async function registerUser(req: FastifyRequest, res: FastifyReply) {
    const registerPayload = createUserSchema.parse(req.body);

    const userId = randomUUID();

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken();

    const user = await handleRegisterUser(
        registerPayload,
        userId,
        refreshToken,
        req.ip,
        req.headers["user-agent"] ?? null,
    );

    setAuthCookies(res, accessToken, refreshToken);

    return response.success(
        res,
        HTTP_STATUS.CREATED,
        "User registered successfully!",
        user,
    );
}

async function loginUser(req: FastifyRequest, res: FastifyReply) {
    const loginPayload = loginUserSchema.parse(req.body);

    const refreshToken = generateRefreshToken();

    const user = await handleLoginUser(
        loginPayload,
        refreshToken,
        req.ip,
        req.headers["user-agent"] ?? null,
    );

    const accessToken = generateAccessToken(user?.id);

    setAuthCookies(res, accessToken, refreshToken);

    return response.success(
        res,
        HTTP_STATUS.OK,
        "User logged in successfully!",
        user,
    );
}

async function logoutUser(req: FastifyRequest, res: FastifyReply) {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        await handleLogoutUser(refreshToken);
    }

    clearAuthCookies(res);

    return response.success(res, HTTP_STATUS.OK, "Logged out successfully");
}

async function refreshUserToken(req: FastifyRequest, res: FastifyReply) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(
            "Please log in again",
            HTTP_STATUS.UNAUTHORIZED,
            HTTP_STATUS_MESSAGE.UNAUTHORIZED,
        );
    }

    const session = await handleRefreshUserToken(refreshToken);

    const accessToken = generateAccessToken(session.userId);

    setAuthCookies(res, accessToken);

    return res.status(HTTP_STATUS.NO_CONTENT).send();
}

export { loginUser, logoutUser, refreshUserToken, registerUser };
