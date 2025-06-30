import { createFetchClient } from "@/lib/api/fetchJson";

export async function get_notice() {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/notice", {
        method: "GET",
    });
}

export async function get_notice_noticeId(noticeId: string | number) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/notice/${noticeId}`, {
        method: "GET",
    });
}
