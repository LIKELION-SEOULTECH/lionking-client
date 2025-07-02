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

export async function post_auth_login(body: LoginRequest): Promise<LoginResponse | null> {
    const fetchJson = await createFetchClient();

    const res = await fetchJson<LoginResponse>("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
    });
    return res ?? null;
}

export async function post_auth_logout(): Promise<{ code: string; message: string } | null> {
    const fetchJson = await createFetchClient();

    const res = await fetchJson<{ code: string; message: string }>("/api/v1/auth/logout", {
        method: "POST",
    });
    return res ?? null;
}

export async function post_auth_reissue(): Promise<LoginResponse | null> {
    const fetchJson = await createFetchClient();
    const refresh = await getCookie("refresh_token");

    const res = await fetchJson<LoginResponse>("/api/v1/auth/reissue", {
        method: "POST",
        headers: {
            "X-Refresh-Token": refresh || "",
        },
        withAuth: true,
    });
    return res ?? null;
}

export async function get_auth_me(): Promise<any | null> {
    const fetchJson = await createFetchClient();
    const res = await fetchJson("/api/v1/auth/me", {
        method: "GET",
    });
    return res ?? null;
}

export async function get_authenticated_userid(): Promise<number> {
    const fetchJson = await createFetchClient();

    const res = await fetchJson<{ data?: { id?: number } }>("/api/v1/auth/me", {
        method: "GET",
        withAuth: true,
    });

    return res?.data?.id ?? 0;
}
