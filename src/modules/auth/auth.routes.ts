import type { FastifyPluginAsync } from "fastify";
import {
    loginUser,
    logoutUser,
    refreshUserToken,
    registerUser,
} from "./auth.controller.js";

const authRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/register", registerUser);
    fastify.post("/login", loginUser);
    fastify.post("/logout", logoutUser);
    fastify.post("/refresh", refreshUserToken);
};

export default authRoutes;
