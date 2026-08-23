import Fastify from "fastify";
import { envConfig } from "./config/index.js";

async function main() {
    const server = Fastify({
        logger: true,
    });

    server.get("/", function (request, reply) {
        reply.send({ hello: "world" });
    });

    server.listen({ port: envConfig.PORT }, function (err, _address) {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
    });
}

main();
