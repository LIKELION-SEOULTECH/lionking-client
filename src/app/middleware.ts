import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get("refresh_token");

    const response = refreshToken
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/login", request.url));

    response.headers.set(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "connect-src 'self' https:",
            "font-src 'self'",
            "frame-src 'none'",
            "upgrade-insecure-requests",
        ].join("; ")
    );

    return response;
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
