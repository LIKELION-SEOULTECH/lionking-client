"use server";

import { refreshToken } from "./auth";

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const res = await fetch(input, {
        ...init,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });

    if (res.status !== 401) return res;

    const refreshed = await refreshToken();
    if (!refreshed) return res;

    return fetch(input, {
        ...init,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });
}
