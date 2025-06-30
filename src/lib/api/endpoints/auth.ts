import { createFetchClient, getCookie } from "@/lib/api/fetchJson";

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
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
    });
}

export async function post_auth_logout(): Promise<{ code: string; message: string }> {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/auth/logout", {
        method: "POST",
    });
}

export async function post_auth_reissue(): Promise<LoginResponse> {
    const fetchJson = await createFetchClient();
    const refresh = await getCookie("refresh_token");

    return fetchJson("/api/v1/auth/reissue", {
        method: "POST",
        headers: {
            "X-Refresh-Token": refresh || "",
        },
        withAuth: true,
    });
}

export async function get_auth_me() {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/auth/me", {
        method: "GET",
    });
}
