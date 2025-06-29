import { fetchJson } from "@/lib/api/fetchJson";

export async function post_auth_login(body: any) {
    return fetchJson("/api/v1/auth/login", {
        method: "POST",
        body,
    });
}

export async function post_auth_logout() {
    return fetchJson("/api/v1/auth/logout", {
        method: "POST",
    });
}

export async function post_auth_reissue() {
    return fetchJson("/api/v1/auth/reissue", {
        method: "POST",
    });
}
