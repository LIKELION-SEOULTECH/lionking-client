"use server";

import { fetchJson } from "@/lib/api/fetchJson";

export async function refreshToken(): Promise<boolean> {
    try {
        await fetchJson("/api/v1/auth/reissue", { method: "POST" });
        return true;
    } catch {
        await fetch("/api/clear-auth", { method: "POST" });
        return false;
    }
}
