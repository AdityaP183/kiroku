import type { FastifyReply } from "fastify";

function setAuthCookies(
    reply: FastifyReply,
    accessToken: string,
    refreshToken?: string,
): void {
    const isSecure = process.env.NODE_ENV === "production";

    reply.setCookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
    });

    if (refreshToken) {
        reply.setCookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isSecure,
            sameSite: "lax",
            path: "/api/v1/auth",
            maxAge: 60 * 60 * 24 * 7,
        });
    }
}

function clearAuthCookies(reply: FastifyReply): void {
    reply.clearCookie("accessToken", {
        path: "/",
    });

    reply.clearCookie("refreshToken", {
        path: "/api/v1/auth",
    });
}

export { setAuthCookies, clearAuthCookies };
