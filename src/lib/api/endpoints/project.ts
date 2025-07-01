"use server";

import { createFetchClient } from "@/lib/api/fetchJson";
import { type Project, type ProjectTypeEnum } from "@/types";

type MemberRetrospection = {
    memberId: number;
    retrospection: string;
};

export type PostProjectRequest = {
    projectName: string;
    projectType: ProjectTypeEnum;
    generation: number;
    projectDescription: string;
    videoLink: string;
    memberRetrospection: MemberRetrospection[];
    memberIds: number[];
    thumbnailImageKey: string;
    landingImagesKeys: string[];
};

export async function get_projects(query?: Record<string, any>) {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/projects", {
        method: "GET",
        headers: { ...(query ? { "X-Query": JSON.stringify(query) } : {}) },
    });
}

export async function post_projects(body: PostProjectRequest) {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/projects", {
        method: "POST",
        body,
    });
}

export async function get_projects_projectId(projectId: string | number) {
    const fetchJson = await createFetchClient();

    const response = await fetchJson(`/api/v1/projects/${projectId}`, {
        method: "GET",
    });

    if (response.status === 404) {
        throw new Error("Project not found");
    }

    return response.data as Project;
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

export async function get_number_of_projects(memberId: string | number): Promise<number> {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/participation/${memberId}`, {
        method: "GET",
    })
        .then((res) => {
            const data = res.data as {
                projectIds: number[];
                count: number;
            };
            return data.count;
        })
        .catch((_e) => {
            return 0;
        });
}
