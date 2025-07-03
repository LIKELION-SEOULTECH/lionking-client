import { parsePublicUrlFromPresignedUrl } from "@/lib/utils";
import { ProjectPreviewMetadata, ProjectTypeEnum, projectTypeEnumToLabel } from "@/types";

export function projectMetaMapper(project: any): ProjectPreviewMetadata {
    return {
        projectId: project.id,
        title: project.title,
        description: project.description,
        projectYear: `${project.generation}기`,
        imageUrl: parsePublicUrlFromPresignedUrl(project.thumbnailurl),
        badges: [
            {
                type: "TEXT",
                text: projectTypeEnumToLabel[project.projectType as ProjectTypeEnum] ?? "기타",
            },
        ],
    };
}
