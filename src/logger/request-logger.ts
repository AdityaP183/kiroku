import type { FastifyInstance } from "fastify";

import { logger } from "./logger.js";

export function registerRequestLogger(app: FastifyInstance): void {
    app.addHook("onResponse", async (request, reply) => {
        const status = reply.statusCode;

        if (status >= 500) {
            logger.error(
                request.id,
                `${status} ${request.method} ${request.url}`,
            );

            return;
        }

        if (status >= 400) {
            logger.warn(
                request.id,
                `${status} ${request.method} ${request.url}`,
            );

            return;
        }

        logger.info(request.id, `${status} ${request.method} ${request.url}`);
    });
}
