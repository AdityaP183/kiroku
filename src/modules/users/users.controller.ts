import type { FastifyReply, FastifyRequest } from "fastify";
import { response } from "../../utils/response.js";
import { HTTP_STATUS } from "../../constants/http.js";
import { getUserById, handleUpdateUser } from "./users.service.js";
import { updateUserSchema } from "./users.schema.js";

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

async function updateUserInfo(req: FastifyRequest, res: FastifyReply) {
    const payload = updateUserSchema.parse(req.body);
    const userId = req.userId;

    const updatedUser = await handleUpdateUser(payload, userId);

    return response.success(
        res,
        HTTP_STATUS.OK,
        "Updated user successfully!",
        updatedUser,
    );
}

export { getCurrentUser, updateUserInfo };
