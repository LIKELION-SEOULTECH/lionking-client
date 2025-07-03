/** 클라이언트 사이드 전용 멤버 수정 엔드포인트 모음  */
import { Parts, Role } from "@/types";

/* 공통 fetch 래퍼 */
async function patch<T extends object>(url: string, body: T): Promise<void> {
    const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`PATCH ${url} → ${res.status} / ${msg}`);
    }
}

/* 권한(ROLE) 변경 */
export async function patchMemberRole(memberId: number, role: Role): Promise<void> {
    return patch(`/api/v1/admin/member/role/${memberId}`, { role });
}

/* 파트(POSITION) 변경 */
export async function patchMemberPosition(memberId: number, position: Parts): Promise<void> {
    return patch(`/api/v1/admin/member/position/${memberId}`, { position });
}

/* 기수(GENERATION) 변경 */
export async function patchMemberGeneration(memberId: number, generation: number): Promise<void> {
    return patch(`/api/v1/admin/member/generation/${memberId}`, { generation });
}
