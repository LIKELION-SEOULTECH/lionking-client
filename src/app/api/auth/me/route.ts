import { NextResponse } from "next/server";
import { createFetchClient } from "@/lib/api/fetchJson";
import { AuthMeResponse } from "@/lib/api/mappers/auth.mapper";

export async function GET() {
    const fetchJson = await createFetchClient();

    const res = await fetchJson<{ data?: AuthMeResponse }>("/api/v1/auth/me", {
        method: "GET",
        withAuth: true,
    });

    if (!res || !res.data) {
        return NextResponse.json(
            {
                code: "UNAUTHORIZED",
                message: "인증되지 않은 사용자입니다.",
            },
            { status: 401 }
        );
    }

    return NextResponse.json({
        code: "OK",
        message: "인증된 사용자 정보입니다.",
        data: res.data,
    });
}
