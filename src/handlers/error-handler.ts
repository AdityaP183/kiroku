import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from "../constants/http.js";
import { response } from "../utils/response.js";
import { AppError } from "../utils/errors/app-error.js";

export const errorHandler = (
    error: FastifyError,
    _request: FastifyRequest,
    reply: FastifyReply,
) => {
    if (error instanceof ZodError) {
        return response.error(
            reply,
            HTTP_STATUS.BAD_REQUEST,
            "Validation failed",
            HTTP_STATUS_MESSAGE.BAD_REQUEST,
        );
    }

    if (error instanceof AppError) {
        return response.error(
            reply,
            error.statusCode,
            error.message,
            error.error,
        );
    }

    const statusCode = error.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;

    return response.error(
        reply,
        statusCode,
        error.message,
        HTTP_STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    );
};
