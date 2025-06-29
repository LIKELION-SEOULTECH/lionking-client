"use server";

import { getBaseUrl } from "./getBaseUrl";

export type FetchJsonOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
    headers?: Record<string, string>;
    credentials?: RequestCredentials;
};

export async function fetchJson<T = any>(
    endpoint: string,
    options: FetchJsonOptions = {}
): Promise<T> {
    const { method = "GET", body, headers, credentials = "include" } = options;

    const res = await fetch(`${getBaseUrl()}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        credentials,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
            const errData = await res.json();
            msg = errData.message || JSON.stringify(errData);
        } catch {}
        throw new Error(msg);
    }

    return res.json();
}
