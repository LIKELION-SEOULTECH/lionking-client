import { createFetchClient } from "@/lib/api/fetchJson";

export async function get_recruit() {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/recruit", {
        method: "GET",
    });
}
