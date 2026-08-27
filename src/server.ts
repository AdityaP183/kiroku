import Fastify from "fastify";
import { envConfig } from "./config/index.js";
import { registerRequestLogger } from "./logger/request-logger.js";
import { logger } from "./logger/logger.js";
import healthRoutes from "./modules/health/health.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./handlers/error-handler.js";
import cookie from "@fastify/cookie";
import usersRoutes from "./modules/users/users.routes.js";

async function main() {
    const server = Fastify({
        logger: false,
        genReqId: () => crypto.randomUUID(),
    });

    registerRequestLogger(server);
    await server.register(cookie);

    server.register(healthRoutes, { prefix: "/api/v1" });
    server.register(authRoutes, { prefix: "/api/v1/auth" });
    server.register(usersRoutes, { prefix: "/api/v1/users" });

    server.setErrorHandler(errorHandler);

    server.listen({ port: envConfig.PORT }, function (err, _address) {
        if (err) {
            logger.error("server", err.message);
            process.exit(1);
        }
        logger.info("server", "Server listening");
    });
}

main();
