import Fastify from "fastify";

const server = Fastify({
    logger: true,
});

server.get("/", function (request, reply) {
    reply.send({ hello: "world" });
});

server.listen({ port: 3000 }, function (err, _address) {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
});
