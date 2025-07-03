import { get_projects } from "@/lib/api/endpoints/project";
import { ProjectPreviewMetadata, ProjectTypeEnum, ProjectTypeFilters } from "@/types";
import ProjectCardStatic from "@/components/ui/ProjectCardStatic";
// import ProjectCardGridClient from "./ProjectCardGridClient";
import { projectMetaMapper } from "@/lib/api/mappers/projectMeta.mapper";
import EmptyViews from "@/components/ui/EmptyViews";
import { extractSummary } from "@/lib/utils";

export const revalidate = 60;

export default async function ProjectCardGrid({
    searchParams,
}: {
    searchParams?: { projectType?: ProjectTypeFilters; generation?: number };
}) {
    const projectType = searchParams?.projectType as ProjectTypeEnum;
    const generation: number = searchParams?.generation ?? 13;

    const data = await get_projects({
        projectType,
        generation,
    }).then((res) => res.data);

    if (!data || data.length === 0) {
        return (
            <div className="w-full flex items-center justify-center h-[30vh]">
                <EmptyViews for="projects" />
            </div>
        );
    }

    const projects: ProjectPreviewMetadata[] = data.map(projectMetaMapper);

    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-[1100px] flex flex-col items-center py-[140px] px-4 sm:px-6 lg:px-0 gap-15">
                {/* <ProjectCardGridClient projectType={projectType} generation={generation} /> */}

                <div className="w-full grid place-items-center gap-x-[35px] gap-y-[52px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCardStatic
                            key={project.projectId}
                            projectId={project.projectId}
                            title={extractSummary(project.title, 13)}
                            description={extractSummary(project.description, 23)}
                            projectYear={project.projectYear}
                            imageUrl={project.imageUrl}
                            badges={project.badges}
                            variant="PROJECT_PAGE"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
