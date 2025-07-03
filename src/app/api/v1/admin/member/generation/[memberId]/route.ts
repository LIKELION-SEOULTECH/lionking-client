// src/app/api/v1/admin/member/generation/[memberId]/route.ts
import { NextResponse } from "next/server";

export async function PATCH(request: Request, context: any) {
    const memberId = context.params.memberId as string;
    const body = await request.json();

    // 쿠키에서 access_token 추출
    const cookieHeader = request.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/access_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : "";

    // 백엔드에 프록시 요청
    const resp = await fetch(
        `http://15.164.107.219:8080/api/v1/admin/member/generation/${memberId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(body),
        }
    );

    return new NextResponse(await resp.text(), { status: resp.status });
}
