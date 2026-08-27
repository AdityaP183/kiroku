import type { FastifyReply, FastifyRequest } from "fastify";
import { response } from "../../utils/response.js";
import { HTTP_STATUS } from "../../constants/http.js";
import { getUserById } from "./users.service.js";

async function getCurrentUser(req: FastifyRequest, res: FastifyReply) {
    const userId = req.userId;

    const currentUser = await getUserById(userId);

    return response.success(
        res,
        HTTP_STATUS.OK,
        "User retrieved successfully",
        currentUser,
    );
}

export { getCurrentUser };
