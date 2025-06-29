import { fetchJson } from "@/lib/api/fetchJson";

export async function post_user_signup(body: any) {
    return fetchJson("/api/v1/user/signup", {
        method: "POST",
        body,
    });
}

export async function get_user() {
    return fetchJson("/api/v1/user", {
        method: "GET",
    });
}
