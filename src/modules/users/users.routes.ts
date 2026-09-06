import type { FastifyPluginAsync } from "fastify";
import authorizedPass from "../../middlewares/auth.js";
import { getCurrentUser, updateUserInfo } from "./users.controller.js";

const usersRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get("/me", { preHandler: authorizedPass }, getCurrentUser);
    fastify.patch("/me", { preHandler: authorizedPass }, updateUserInfo);
};

export default usersRoutes;
