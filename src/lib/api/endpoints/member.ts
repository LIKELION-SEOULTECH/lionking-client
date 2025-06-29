import { fetchJson } from "@/lib/api/fetchJson";

export async function get_member_memberId(memberId: string | number) {
    return fetchJson(`/api/v1/member/${memberId}`, {
        method: "GET",
    });
}

export async function put_member_memberId(memberId: string | number, body: any) {
    return fetchJson(`/api/v1/member/${memberId}`, {
        method: "PUT",
        body,
    });
}

export async function get_member() {
    return fetchJson("/api/v1/member", {
        method: "GET",
    });
}
