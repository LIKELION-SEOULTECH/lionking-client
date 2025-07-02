"use server";

import { cookies } from "next/headers";
import { getBaseUrl } from "./getBaseUrl";
import { post_auth_reissue } from "./endpoints/auth";
import { redirect } from "next/navigation";

export type FetchJsonOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
    headers?: Record<string, string>;
    withAuth?: boolean;
};

export async function getCookie(name: string): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
}

export async function createFetchClient() {
    const makeRequestWithAuthHandling = async (
        endpoint: string,
        options: {
            method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
            body?: unknown;
            headers?: Record<string, string>;
        } = {},
        retry = true
    ) => {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("access_token")?.value;

        const requestHeaders: HeadersInit = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        requestHeaders["Authorization"] = `Bearer ${accessToken}`;

        const response = await fetch(`${getBaseUrl()}${endpoint}`, {
            method: options.method || "GET",
            headers: requestHeaders,
            body: options.body ? JSON.stringify(options.body) : undefined,
            credentials: "include",
        });

        if (response.status === 401 && retry) {
            try {
                const newAccessToken = await post_auth_reissue();

                return await makeRequestWithAuthHandling(
                    endpoint,
                    {
                        ...options,
                        headers: {
                            ...options.headers,
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                    },
                    false
                );
            } catch (error) {
                console.error(error);
                redirect("/login");
            }
        }

        return response;
    };

    async function fetchJson<T = any>(
        endpoint: string,
        options: {
            method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
            body?: unknown;
            headers?: Record<string, string>;
            withAuth?: boolean;
        } = {}
    ): Promise<T | null> {
        const { withAuth = false, ...restOptions } = options;

        try {
            const url = `${getBaseUrl()}${endpoint}`;

            const response = withAuth
                ? await makeRequestWithAuthHandling(endpoint, restOptions)
                : await fetch(url, {
                      method: restOptions.method || "GET",
                      headers: {
                          "Content-Type": "application/json",
                          ...restOptions.headers,
                      },
                      body: restOptions.body ? JSON.stringify(restOptions.body) : undefined,
                      credentials: "include",
                  });

            if (response.status === 204) return null;

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                console.warn(`Request failed: ${response.status} ${url}`, data);
                return null;
            }

            return data;
        } catch (err) {
            console.warn(`Error: ${endpoint}`, err);
            return null;
        }
    }

    return fetchJson;
}
