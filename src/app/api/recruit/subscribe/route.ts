// src/app/api/recruit/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email } = await request.json();
    // TODO: DB에 저장하거나 큐에 등록하는 로직
    return NextResponse.json({
        code: "OK",
        message: "알림 신청이 완료되었습니다.",
        data: {},
    });
}
