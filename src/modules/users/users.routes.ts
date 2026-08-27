import type { FastifyPluginAsync } from "fastify";
import authorizedPass from "../../middlewares/auth.js";
import { getCurrentUser } from "./users.controller.js";

const usersRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get("/me", { preHandler: authorizedPass }, getCurrentUser);
};

export default usersRoutes;
