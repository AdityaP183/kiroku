import type { FastifyPluginAsync } from "fastify";
import {
    changeUserPassword,
    loginUser,
    logoutUser,
    refreshUserToken,
    registerUser,
} from "./auth.controller.js";
import authorizedPass from "../../middlewares/auth.js";

const authRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/register", registerUser);
    fastify.post("/login", loginUser);
    fastify.post("/logout", logoutUser);
    fastify.post("/refresh", refreshUserToken);

    fastify.patch(
        "/change-password",
        { preHandler: authorizedPass },
        changeUserPassword,
    );
};

export default authRoutes;
