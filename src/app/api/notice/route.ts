import { NextResponse, NextRequest } from "next/server";
import { get_notice, create_admin_notice, CreateNoticeInput } from "@/lib/api/endpoints/notice";
import { mapNotice } from "@/lib/api/mappers/notice.mapper";
import type { Role } from "@/types";

export async function GET() {
    try {
        // 백엔드 → /api/v1/notice
        const raw = await get_notice(); // { code, message, data: [...] }
        const data = Array.isArray(raw?.data) ? raw.data.map(mapNotice) : [];
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error("[api/notice] proxy error:", err);
        return NextResponse.json({ message: "Failed to load notices" }, { status: 500 });
    }
}

// 운영진(MANAGER) · 대표(REPRESENTATIVE)만 허용
const ALLOWED_ROLES: Role[] = ["MANAGER", "REPRESENTATIVE"];

/** JWT payload 파싱 헬퍼 */
async function getUserFromRequest(req: NextRequest): Promise<{ id: number; role: Role } | null> {
    const token = req.cookies.get("access_token")?.value;
    if (!token) return null;

    const [, b64] = token.split(".");
    // base64url → JSON 디코드 (Node runtime)
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString());

    return {
        id: Number(payload.sub), // ← claim 이름이 sub 아닌 경우 수정
        role: payload.role as Role, // ← claim 이름/값 확인
    };
}

// ─────────── POST (New Notice) ───────────
export async function POST(req: NextRequest) {
    const user = await getUserFromRequest(req);
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!ALLOWED_ROLES.includes(user.role)) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const payload = (await req.json()) as CreateNoticeInput;

    try {
        const res = await create_admin_notice(user.id, payload);
        return NextResponse.json(res, { status: 201 });
    } catch (e) {
        console.error("[api/notice] POST proxy error:", e);
        return NextResponse.json({ message: "Failed to create notice" }, { status: 500 });
    }
}
