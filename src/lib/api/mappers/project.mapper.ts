import type { ProjectFormValues } from "@/components/forms/configs/projectFormConfig";
import { parsePublicUrlFromPresignedUrl } from "@/lib/utils";
import { positionEnumToLabel, type Project } from "@/types";

export async function projectToFormValues(project: Project): Promise<ProjectFormValues> {
    return {
        projectName: project.title,
        projectType: project.projectType,
        projectYear: project.generation,
        projectDescription: project.description,
        projectVideo: project.videoLink || "",
        projectMembers: project.participations,
        projectThumbnail: parsePublicUrlFromPresignedUrl(project.thumbnail) || "",
        projectLandingImages: project.landingImages.map(parsePublicUrlFromPresignedUrl),
        projectRecaps: project.participations.map((p) => {
            return {
                member: {
                    memberId: p.memberId,
                    username: p.username,
                    positionLabel: p.position ? positionEnumToLabel[p.position] : "",
                },
                content: p.retrospection || "",
            };
        }),
    };
}
