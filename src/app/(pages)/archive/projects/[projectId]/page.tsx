import ProjectDetailMeta from "./components/ProjectDetailMeta";
import ProjectDetailImages from "./components/ProjectDetailImages";
import ProjectDetailRecap from "./components/ProjectDetailRecap";
import { get_projects, get_projects_projectId } from "@/lib/api/endpoints/project";
import type { Project } from "@/types";
import { parsePublicUrlFromPresignedUrl } from "@/lib/utils";

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;

    const project = await get_projects_projectId(projectId);

    return (
        <>
            <ProjectDetailMeta project={project} />

            {project.landingImages && project.landingImages.length > 0 && (
                <ProjectDetailImages
                    images={project.landingImages.map(parsePublicUrlFromPresignedUrl)}
                />
            )}

            <ProjectDetailRecap recaps={project.participations} />
        </>
    );
}

export async function generateStaticParams() {
    const data = await get_projects().then((res) => res.data);

    return (data ?? []).map((project: Project) => ({
        projectId: project.id.toString(),
    }));
}
