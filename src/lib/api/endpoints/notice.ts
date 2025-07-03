"use server";

import { createFetchClient } from "@/lib/api/fetchJson";
import { mapNotice, NoticeDto } from "../mappers/notice.mapper";

export async function get_notice() {
    const fetchJson = await createFetchClient();

    const response = await fetchJson("/api/v1/notice", {
        method: "GET",
    }).then((res) => {
        if (!res || !res.data) return [];
        try {
            return (res.data as NoticeDto[]).map(mapNotice);
        } catch (e) {
            console.warn("get_notice failed:", e);
            return [];
        }
    });

    return response;
}

export async function get_notice_noticeId(noticeId: string | number) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/notice/${noticeId}`, {
        method: "GET",
    });
}

export interface CreateNoticeInput {
    noticeType: "GENERAL" | "IMPORTANT";
    title: string;
    content: string;
    contentMedia?: { s3Key: string; mediaType: "IMAGE" | "VIDEO" }[];
}

export async function create_admin_notice(authorId: number, payload: CreateNoticeInput) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/admin/notice/${authorId}`, {
        method: "POST",
        body: payload,
        withAuth: true, // access_token 자동 부착
    });
}

/** 공지 수정 (PATCH) */
export async function patch_admin_notice(noticeId: string | number, payload: CreateNoticeInput) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/admin/notice/${noticeId}`, {
        method: "PATCH",
        body: payload,
        withAuth: true,
    });
}

/** 공지 삭제 (관리자 전용) */
export async function delete_admin_notice(noticeId: string | number) {
    const fetchJson = await createFetchClient();
    return fetchJson(`/api/v1/admin/notice/${noticeId}`, {
        method: "DELETE",
        withAuth: true,
    });
}
