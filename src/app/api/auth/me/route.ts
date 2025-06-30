import { NextResponse } from "next/server";
import { createFetchClient } from "@/lib/api/fetchJson";
import { AuthMeResponse } from "@/lib/api/mappers/auth.mapper";

export async function GET() {
    const fetchJson = await createFetchClient();

    try {
        const data = await fetchJson("/api/v1/auth/me", {
            method: "GET",
            withAuth: true,
        }).then((res) => res.data as AuthMeResponse);

        return NextResponse.json({
            code: "OK",
            message: "인증된 사용자 정보입니다.",
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                code: "UNAUTHORIZED",
                message: error instanceof Error ? error.message : "알 수 없는 오류",
            },
            { status: 401 }
        );
    }
}
