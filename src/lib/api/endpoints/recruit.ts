import { fetchJson } from "@/lib/api/fetchJson";

export async function post_recruit_subscribe(body: any) {
    return fetchJson("/api/v1/recruit/subscribe", {
        method: "POST",
        body,
    });
}

export async function get_recruit() {
    return fetchJson("/api/v1/recruit", {
        method: "GET",
    });
}
