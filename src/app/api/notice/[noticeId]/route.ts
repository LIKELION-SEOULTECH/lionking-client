// src/app/api/notice/[noticeId]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

import {
    get_notice_noticeId,
    patch_admin_notice,
    CreateNoticeInput,
    delete_admin_notice,
} from "@/lib/api/endpoints/notice";
import { mapNoticeDetail } from "@/lib/api/mappers/notice.mapper";

import type { Role } from "@/types";

/*───────────────────────────────────────────────────────────────*
 * ① 공통: 권한-헬퍼 / 허용 롤
 *───────────────────────────────────────────────────────────────*/
const ALLOWED_ROLES: Role[] = ["MANAGER", "REPRESENTATIVE"]; // 운영진·대표

function getUserFromRequest(req: NextRequest): { id: number; role: Role } | null {
    const token = req.cookies.get("access_token")?.value;
    if (!token) return null;

    const [, b64] = token.split(".");
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString());

    return {
        id: Number(payload.sub), // claim 이름이 다른 경우 수정
        role: payload.role as Role, // claim 이름이 다른 경우 수정
    };
}

/*───────────────────────────────────────────────────────────────*
 * ② 상세 조회  GET /api/notice/[id]
 *───────────────────────────────────────────────────────────────*/
export async function GET(_req: NextRequest, { params }: { params: { noticeId: string } }) {
    try {
        const raw = await get_notice_noticeId(params.noticeId); // { code, data } or { … }
        const dto = raw?.data ?? raw;
        const data = mapNoticeDetail(dto);
        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        console.error("[api/notice/:id] GET error:", e);
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
}

/*───────────────────────────────────────────────────────────────*
 * ③ 공지 수정  PATCH /api/notice/[id]
 *───────────────────────────────────────────────────────────────*/
export async function PATCH(req: NextRequest, { params }: { params: { noticeId: string } }) {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!ALLOWED_ROLES.includes(user.role))
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const payload = (await req.json()) as CreateNoticeInput;

    try {
        // 백엔드 → PATCH /api/v1/admin/notice/{noticeId}
        const result = await patch_admin_notice(params.noticeId, payload);
        return NextResponse.json(result, { status: 200 });
    } catch (e) {
        console.error("[api/notice/:id] PATCH error:", e);
        return NextResponse.json({ message: "Failed to update notice" }, { status: 500 });
    }
}

/** DELETE /api/notice/{noticeId} */
export async function DELETE(req: NextRequest, { params }: { params: { noticeId: string } }) {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!ALLOWED_ROLES.includes(user.role))
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    try {
        await delete_admin_notice(params.noticeId);
        // 204 No Content로 해도 되지만, 여기선 빈 객체와 200으로 응답
        return NextResponse.json({}, { status: 200 });
    } catch (e) {
        console.error("[api/notice/:id] DELETE error:", e);
        return NextResponse.json({ message: "Failed to delete notice" }, { status: 500 });
    }
}
