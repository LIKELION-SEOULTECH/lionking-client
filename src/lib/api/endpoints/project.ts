import { fetchJson } from "@/lib/api/fetchJson";

export async function get_projects(query?: Record<string, any>) {
    return fetchJson("/api/v1/projects", {
        method: "GET",
        headers: { ...(query ? { "X-Query": JSON.stringify(query) } : {}) },
    });
}

export async function post_projects(body: any) {
    return fetchJson("/api/v1/projects", {
        method: "POST",
        body,
    });
}

export async function get_projects_projectId(projectId: string | number) {
    return fetchJson(`/api/v1/projects/${projectId}`, {
        method: "GET",
    });
}

export async function delete_projects_projectId(projectId: string | number) {
    return fetchJson(`/api/v1/projects/${projectId}`, {
        method: "DELETE",
    });
}

export async function patch_projects_projectId(projectId: string | number, body: any) {
    return fetchJson(`/api/v1/projects/${projectId}`, {
        method: "PATCH",
        body,
    });
}
