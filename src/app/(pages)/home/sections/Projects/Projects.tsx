import Section from "@/components/ui/Section";
import ProjectCardList from "./components/ProjectCardList";
import type { ProjectCardProps } from "./components/ProjectCard";
import LeftArrow from "@/assets/ic_arrow_right_white.svg";
import Link from "next/link";

const mockProjects: ProjectCardProps[] = Array.from({ length: 7 }, (_, i) => ({
    imageSrc: "/static/images/330x186.svg",
    information: {
        projectName: `서비스명 ${i + 1}`,
        projectDescription: "서비스 한 줄 설명을 적어주세요",
        projectYear: "13기",
    },
    badge: "BEST",
}));

export default function Projects() {
    return (
        <Section displayName="Projects" displayTitle="과기대 멋사의 프로젝트들을 소개합니다">
            <div className="flex flex-col items-center justify-center gap-[60px] -mt-[16px]">
                <ProjectCardList items={mockProjects} />

                <Link href="/projects">
                    <button className="flex items-center justify-center gap-1 px-5 py-3 text-white transition-colors duration-200 rounded-full cursor-pointer bg-gray-7 hover:bg-gray-7/60">
                        <span className="sub3_sb">프로젝트 더보기</span>
                        <LeftArrow />
                    </button>
                </Link>
            </div>
        </Section>
    );
}
