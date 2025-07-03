"use server";

import { revalidatePath } from "next/cache";
import { createFetchClient } from "@/lib/api/fetchJson";
import { memberMapper } from "../mappers/member.mapper";
import type { Member } from "@/types";

export async function get_member_memberId(memberId: string | number) {
    const fetchJson = await createFetchClient();
    return fetchJson(`/api/v1/member/${memberId}`, {
        method: "GET",
    }).then((res) => memberMapper(res.data));
}

export async function put_member_memberId(memberId: string | number, body: any) {
    try {
        const fetchJson = await createFetchClient();

        await fetchJson(`/api/v1/member/${memberId}`, {
            method: "PUT",
            body,
        });

        revalidatePath("/about/members");
        revalidatePath(`/about/members/${memberId}`);
        revalidatePath("/dashboard", "layout");

        return { success: true, message: "프로필이 저장되었습니다." };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { success: false, message: "저장에 실패했습니다." };
    }
}

export async function get_member(): Promise<Member[]> {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/member", {
        method: "GET",
    }).then((res) => res.data.map(memberMapper));
}
