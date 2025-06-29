import { NextRequest, NextResponse } from "next/server";
import { fetchJson } from "@/lib/api/fetchJson";

export async function POST(req: NextRequest) {
    const { loginId, password } = await req.json();

    try {
        const response = await fetchJson<{
            code: string;
            message: string;
            data: {
                accessToken: string;
                refreshToken: string;
                userId: number;
                memberId: number;
                username: string;
            };
        }>("/api/v1/auth/login", {
            method: "POST",
            body: { loginId, password },
        });

        const { accessToken, refreshToken } = response.data;

        const res = NextResponse.json({ success: true });

        res.cookies.set("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 15,
        });

        res.cookies.set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });

        return res;
    } catch (err) {
        return NextResponse.json(
            { success: false, error: (err as Error).message },
            { status: 401 }
        );
    }
}
