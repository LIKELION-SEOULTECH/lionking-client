import { createFetchClient } from "@/lib/api/fetchJson";
import { post_recruit_subscribe } from "@/lib/api/endpoints/recruit";

export async function get_recruit() {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/recruit", {
        method: "GET",
    });
}
