import { createFetchClient } from "@/lib/api/fetchJson";
import type { Project } from "@/types";

export async function get_projects(query?: Record<string, any>) {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/projects", {
        method: "GET",
        headers: { ...(query ? { "X-Query": JSON.stringify(query) } : {}) },
    });
}

export async function post_projects(body: any) {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/projects", {
        method: "POST",
        body,
    });
}

export async function get_projects_projectId(projectId: string | number) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/projects/${projectId}`, {
        method: "GET",
    }).then((res) => {
        if (res.status === 404) {
            throw new Error("Project not found");
        }
        return res.data as Project;
    });
}

export async function delete_projects_projectId(projectId: string | number) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/projects/${projectId}`, {
        method: "DELETE",
    });
}

export async function patch_projects_projectId(projectId: string | number, body: any) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/projects/${projectId}`, {
        method: "PATCH",
        body,
    });
}
