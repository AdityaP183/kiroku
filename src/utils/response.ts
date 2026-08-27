import type { FastifyReply } from "fastify";

type SuccessResponse<T> = {
    success: true;
    message: string;
    data?: T;
};

type ErrorResponse = {
    success: false;
    message: string;
    error: string;
    statusCode: number;
};

function success<T>(
    reply: FastifyReply,
    statusCode: number,
    message: string,
    data?: T,
) {
    const response: SuccessResponse<T> = {
        success: true,
        message,
        ...(data !== undefined ? { data } : {}),
    };

    return reply.status(statusCode).send(response);
}

function error(
    reply: FastifyReply,
    statusCode: number,
    message: string,
    error: string,
) {
    const response: ErrorResponse = {
        success: false,
        message,
        error,
        statusCode,
    };

    return reply.status(statusCode).send(response);
}

export const response = {
    success,
    error,
};
