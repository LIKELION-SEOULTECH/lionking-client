// src/app/api/notice/[noticeId]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

import {
    get_notice_noticeId,
    patch_admin_notice,
    delete_admin_notice,
    CreateNoticeInput,
} from "@/lib/api/endpoints/notice";
import { mapNoticeDetail } from "@/lib/api/mappers/notice.mapper";
import type { Role } from "@/types";

const ALLOWED_ROLES: Role[] = ["MANAGER", "REPRESENTATIVE"];

// JWT 쿠키에서 id·role 추출 (async)
async function getUserFromToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) return null;
    const [, b64] = token.split(".");
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString());
    return { id: Number(payload.sub), role: payload.role as Role };
}

/** GET /api/notice/{noticeId} */
export async function GET(req: NextRequest, context: any) {
    const noticeId = context.params.noticeId;
    try {
        const raw = await get_notice_noticeId(noticeId);
        const dto = raw?.data ?? raw;
        const detail = mapNoticeDetail(dto);
        return NextResponse.json(detail);
    } catch {
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
}

/** PATCH /api/notice/{noticeId} */
export async function PATCH(req: NextRequest, context: any) {
    const noticeId = context.params.noticeId;
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!ALLOWED_ROLES.includes(user.role))
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const payload = (await req.json()) as CreateNoticeInput;
    try {
        const result = await patch_admin_notice(noticeId, payload);
        return NextResponse.json(result);
    } catch {
        return NextResponse.json({ message: "Failed to update notice" }, { status: 500 });
    }
}

/** DELETE /api/notice/{noticeId} */
export async function DELETE(req: NextRequest, context: any) {
    const noticeId = context.params.noticeId;
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!ALLOWED_ROLES.includes(user.role))
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    try {
        await delete_admin_notice(noticeId);
        return NextResponse.json({}, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Failed to delete notice" }, { status: 500 });
    }
}
