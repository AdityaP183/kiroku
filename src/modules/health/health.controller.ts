import { type FastifyReply } from "fastify";
import { response } from "../../utils/response.js";

async function getHealth(_request: unknown, reply: FastifyReply) {
    return response.success(reply, 200, "Server is healthy", {
        status: "ok",
        version: "0.1.0",
    });
}

export { getHealth };
