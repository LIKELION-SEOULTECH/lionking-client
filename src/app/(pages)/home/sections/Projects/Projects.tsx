import Section from "@/components/ui/Section";
import ProjectCardList from "./components/ProjectCardList";
import ViewMoreButton from "./components/ViewMoreButton";
import type { ProjectCardProps } from "./components/ProjectCard";

const mockProjects: ProjectCardProps[] = Array.from({ length: 7 }, (_, i) => ({
    imageSrc: "/static/images/placeholder_logo.png",
    information: {
        projectName: `서비스명 ${i + 1}`,
        projectDescription: "서비스 한 줄 설명을 적어주세요",
        projectYear: "13기",
    },
    badge: "BEST",
}));

export default function Projects() {
    return (
        <Section
            displayName="Projects"
            displayTitle="과기대 멋사의 프로젝트들을 소개합니다"
            className="py-[130px]"
        >
            <div className="flex flex-col items-center justify-center gap-[60px] -mt-[16px]">
                <ProjectCardList items={mockProjects} />

                <ViewMoreButton />
            </div>
        </Section>
    );
}
