import { createFetchClient } from "@/lib/api/fetchJson";

export async function get_recruit() {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/recruit", {
        method: "GET",
    });
}

export async function post_recruit_subscribe(email: string) {
    const fetchJson = await createFetchClient();
    return fetchJson("/api/recruit/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
}
