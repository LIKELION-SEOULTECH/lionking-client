import { fetchJson } from "@/lib/api/fetchJson";

type LoginRequest = {
    loginId: string;
    password: string;
};

type LoginResponse = {
    code: string;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        userId: number;
        memberId: number;
        username: string;
    };
};

export async function post_auth_login(body: LoginRequest): Promise<LoginResponse> {
    return fetchJson("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
}

export async function post_auth_logout(): Promise<{ code: string; message: string }> {
    return fetchJson("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
    });
}

export async function post_auth_reissue(): Promise<LoginResponse> {
    return fetchJson("/api/v1/auth/reissue", {
        method: "POST",
        credentials: "include",
    });
}

export async function get_auth_me() {
    return fetchJson("/api/v1/auth/me", {
        method: "GET",
        credentials: "include",
    });
}
