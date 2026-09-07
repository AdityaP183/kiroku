import type { FastifyPluginAsync } from "fastify";
import authorizedPass from "../../middlewares/auth.js";
import {
    getAllUserDeletionRequests,
    getCurrentUser,
    updateUserInfo,
    userDeletionRequest,
} from "./users.controller.js";

const usersRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get("/me", { preHandler: authorizedPass }, getCurrentUser);
    fastify.patch("/me", { preHandler: authorizedPass }, updateUserInfo);
    fastify.get(
        "/me/deletion-request",
        { preHandler: authorizedPass },
        getAllUserDeletionRequests,
    );
    fastify.post(
        "/me/deletion-request",
        { preHandler: authorizedPass },
        userDeletionRequest,
    );
};

export default usersRoutes;
