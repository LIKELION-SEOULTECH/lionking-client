import { NextRequest, NextResponse } from "next/server";
import { fetchJson } from "@/lib/api/fetchJson";

export async function POST(req: NextRequest) {
    const { loginId, password } = await req.json();

    try {
        const data = await fetchJson<{
            accessToken: string;
            refreshToken: string;
        }>("/api/v1/auth/login", {
            method: "POST",
            body: { loginId, password },
        });

        const response = NextResponse.json({ success: true });

        response.cookies.set("access_token", data.accessToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 15,
        });

        response.cookies.set("refresh_token", data.refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (err) {
        return NextResponse.json(
            { success: false, error: (err as Error).message },
            { status: 401 }
        );
    }
}
