import type { ProjectFormValues } from "@/components/forms/configs/projectFormConfig";
import type { Project } from "@/types";

export async function projectToFormValues(project: Project): Promise<ProjectFormValues> {
    return {
        projectName: project.title,
        projectType: project.projectType,
        projectYear: project.generation,
        projectDescription: project.description,
        projectVideo: project.videoLink || "",
        projectMembers: project.participations,
        projectThumbnail: project.thumbnail,
        projectLandingImages: project.landingImages,
        projectRecaps: project.participations.map((p) => {
            return {
                memberId: p.memberId,
                username: p.username,
                content: p.retrospection || "",
            };
        }),
    };
}
