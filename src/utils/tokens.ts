import { randomBytes } from "node:crypto";

import jwt, { type JwtPayload } from "jsonwebtoken";

import { envConfig } from "../config/index.js";

function generateAccessToken(userId: string): string {
    return jwt.sign(
        {
            sub: userId,
        },
        envConfig.JWT_ACCESS_SECRET,
        {
            expiresIn: "15m",
        },
    );
}

function generateRefreshToken(): string {
    return randomBytes(64).toString("hex");
}

function verifyAccessToken(token: string): string | JwtPayload {
    return jwt.verify(token, envConfig.JWT_ACCESS_SECRET);
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken };
