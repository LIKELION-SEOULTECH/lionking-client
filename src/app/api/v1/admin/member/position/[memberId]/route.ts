// src/app/api/v1/admin/member/position/[memberId]/route.ts
import { NextRequest, NextResponse } from "next/server";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL!;
export async function PATCH(request: NextRequest, { params }: { params: { memberId: string } }) {
    const body = await request.json();
    const resp = await fetch(`${BACKEND}/api/v1/admin/member/position/${params.memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    });
    return new NextResponse(await resp.text(), { status: resp.status });
}
