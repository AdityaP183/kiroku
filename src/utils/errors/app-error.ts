import type { HTTP_STATUS } from "../../constants/http.js";

type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

class AppError extends Error {
    statusCode: HttpStatusCode;
    error: string;

    constructor(message: string, statusCode: HttpStatusCode, error: string) {
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.error = error;

        Error.captureStackTrace(this, this.constructor);
    }
}

export { AppError };
