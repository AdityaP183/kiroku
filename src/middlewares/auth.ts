import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/errors/app-error.js";
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from "../constants/http.js";
import { verifyAccessToken } from "../utils/tokens.js";

async function authorizedPass(req: FastifyRequest, _res: FastifyReply) {
    const token = req.cookies.accessToken;
    if (!token) {
        throw new AppError(
            "Unauthorized",
            HTTP_STATUS.UNAUTHORIZED,
            HTTP_STATUS_MESSAGE.UNAUTHORIZED,
        );
    }

    const payload = verifyAccessToken(token);

    if (typeof payload === "string" || !payload.sub) {
        throw new AppError(
            "Invalid or expired access token",
            HTTP_STATUS.UNAUTHORIZED,
            HTTP_STATUS_MESSAGE.UNAUTHORIZED,
        );
    }

    req.userId = payload.sub;
}

export default authorizedPass;
