import { fetchJson } from "@/lib/api/fetchJson";

export async function get_notice() {
    return fetchJson("/api/v1/notice", {
        method: "GET",
    });
}

export async function get_notice_noticeId(noticeId: string | number) {
    return fetchJson(`/api/v1/notice/${noticeId}`, {
        method: "GET",
    });
}
