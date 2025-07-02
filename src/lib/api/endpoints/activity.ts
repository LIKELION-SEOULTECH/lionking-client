"use server";

import { createFetchClient } from "@/lib/api/fetchJson";
import { News, NewsRequest } from "@/types";

export async function get_activity() {
    const fetchJson = await createFetchClient();

    const response = await fetchJson("/api/v1/activity", {
        method: "GET",
    });

    if (!response || !response.data) {
        return [];
    }

    return response.data as News[];
}

export async function get_activity_activityId(activityId: string | number) {
    const fetchJson = await createFetchClient();

    const response = await fetchJson(`/api/v1/activity/${activityId}`, {
        method: "GET",
    });

    if (!response || !response.data) {
        return null;
    }

    return response.data as News;
}

export async function post_activity(authorId: string | number, body: NewsRequest) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/admin/activity/${authorId}`, {
        method: "POST",
        body,
    });
}

export async function delete_activity_activityId(activityId: string | number) {
    const fetchJson = await createFetchClient();

    const response = await fetchJson(`/api/v1/admin/activity/${activityId}`, {
        method: "DELETE",
    });

    if (!response || !response.data) {
        return null;
    }

    return response;
}

export async function patch_activity_activityId(activityId: string | number, body: NewsRequest) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/admin/activity/${activityId}`, {
        method: "PATCH",
        body,
    });
}
