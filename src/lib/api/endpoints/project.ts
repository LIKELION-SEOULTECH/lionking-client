"use server";

import { createFetchClient } from "@/lib/api/fetchJson";
import { ProjectPreviewMetadata, type Project, type ProjectTypeEnum } from "@/types";
import { projectMetaMapper } from "../mappers/projectMeta.mapper";

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

    if (!response || !response.data) {
        return null;
    }

    return response.data as Project;
}

export async function delete_projects_projectId(projectId: string | number) {
    const fetchJson = await createFetchClient();

    const response = await fetchJson(`/api/v1/projects/${projectId}`, {
        method: "DELETE",
    });

    if (!response || !response.data) {
        return null;
    }

    return response;
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

export async function get_projects_metadata_by_user_id(
    memberId: number
): Promise<ProjectPreviewMetadata[]> {
    const fetchJson = await createFetchClient();

    let projectIds: number[] = [];
    try {
        const res = await fetchJson(`/api/v1/participation/${memberId}`, {
            method: "GET",
        });

        const data = res.data as {
            projectIds: number[];
            count: number;
        };

        projectIds = data.projectIds ?? [];
    } catch (error) {
        return [];
    }

    if (projectIds.length === 0) return [];

    let allProjects: ProjectPreviewMetadata[] = [];
    try {
        const res = await fetchJson("/api/v1/projects", {
            method: "GET",
        });

        allProjects = res.data.map(projectMetaMapper);
    } catch (error) {
        return [];
    }

    const matchedProjects = allProjects.filter((project) => projectIds.includes(project.projectId));

    return matchedProjects.length > 0 ? matchedProjects : [];
}
