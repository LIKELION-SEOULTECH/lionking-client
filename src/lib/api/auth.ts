"use server";

import { createFetchClient } from "@/lib/api/fetchJson";
import { AuthMeResponse, authVerifyMapper } from "./mappers/auth.mapper";
import { redirect } from "next/navigation";

export async function refreshToken(): Promise<boolean> {
    const fetchJson = await createFetchClient();

    try {
        await fetchJson("/api/v1/auth/reissue", { method: "POST" });
        return true;
    } catch {
        await fetch("/api/logout", { method: "POST" });
        return false;
    }
}

export async function getMe() {
    const fetchJson = await createFetchClient();
    try {
        const res = await fetchJson("/api/v1/auth/me", {
            method: "GET",
            withAuth: true,
        }).then((res) => res.data as AuthMeResponse);

        const mappedUser = authVerifyMapper(res);
        return mappedUser;
    } catch (error) {
        console.error("getMe failed:", error);
        redirect("/login");
    }
}
