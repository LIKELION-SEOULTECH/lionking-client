import type { ProjectFormValues } from "@/components/forms/configs/projectFormConfig";
import type { Member, Project } from "@/types";

async function fetchMember(memberId: string | number): Promise<Member> {
    const res = await fetch(`/api/members/${memberId}`);
    if (!res.ok) throw new Error(`Failed to fetch member ${memberId}`);
    return res.json();
}

export async function projectToFormValues(project: Project): Promise<ProjectFormValues> {
    // const members = await Promise.all(
    //     project.participations.map((memberId) => fetchMember(memberId))
    // );

    return {
        projectName: project.title,
        projectType: project.projectType,
        projectYear: project.generation,
        projectDescription: project.description,
        projectVideo: project.videoLink || "",
        projectMembers: [1, 2], // MOCK!!
        projectThumbnail: project.thumbnail,
        projectLandingImages: project.landingImages,
        // projectRecaps: project.retrospections.map((r) => {
        //     const matched = members.find((m) => m.id === r.memberId);
        //     return {
        //         memberId: 0,
        //         content: r.content,
        //     };
        // }),

        // MOCK!!
        projectRecaps: project.retrospections.map((r, idx) => ({
            memberId: 1 + idx, // MOCK!!
            content: r.content,
        })),
    };
}
