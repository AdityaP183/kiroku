import Fastify from "fastify";
import { envConfig } from "./config/index.js";
import { registerRequestLogger } from "./logger/request-logger.js";
import { logger } from "./logger/logger.js";

async function main() {
    const server = Fastify({
        logger: false,
        genReqId: () => crypto.randomUUID(),
    });

    registerRequestLogger(server);

    server.get("/", function (request, reply) {
        reply.send({ hello: "world" });
    });

    server.listen({ port: envConfig.PORT }, function (err, _address) {
        if (err) {
            logger.error("server", err.message);
            process.exit(1);
        }
        logger.info("server", "Server listening");
    });
}

main();
