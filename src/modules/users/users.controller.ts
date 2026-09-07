import type { FastifyReply, FastifyRequest } from "fastify";
import { response } from "../../utils/response.js";
import { HTTP_STATUS } from "../../constants/http.js";
import {
    getUserById,
    handleGetAllUserDeletionRequests,
    handleUpdateUser,
    handleUserDeletionRequest,
} from "./users.service.js";
import { updateUserSchema } from "./users.schema.js";
import { randomUUID } from "node:crypto";

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

async function userDeletionRequest(req: FastifyRequest, res: FastifyReply) {
    const userId = req.userId;
    const userDeletionTableId = randomUUID();

    const deletionRequest = await handleUserDeletionRequest(
        userId,
        userDeletionTableId,
    );

    return response.success(
        res,
        HTTP_STATUS.CREATED,
        "Account deletion request submitted successfully!",
        deletionRequest,
    );
}

async function getAllUserDeletionRequests(
    req: FastifyRequest,
    res: FastifyReply,
) {
    const userId = req.userId;

    const deletionRequests = await handleGetAllUserDeletionRequests(userId);

    return response.success(
        res,
        HTTP_STATUS.OK,
        "Account deletion request retrieved successfully!",
        deletionRequests,
    );
}

export {
    getCurrentUser,
    updateUserInfo,
    userDeletionRequest,
    getAllUserDeletionRequests,
};
