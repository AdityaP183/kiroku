import { type FastifyPluginAsync } from "fastify";
import { getHealth } from "./health.controller.js";

const healthRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get("/health", getHealth);
};

export default healthRoutes;
