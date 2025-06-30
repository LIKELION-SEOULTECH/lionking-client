import { createFetchClient } from "@/lib/api/fetchJson";

export async function post_user_signup(body: any) {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/user/signup", {
        method: "POST",
        body,
    });
}

export async function get_user() {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/user", {
        method: "GET",
    });
}
