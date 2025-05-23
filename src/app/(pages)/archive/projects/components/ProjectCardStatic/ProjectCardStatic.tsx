import type { BadgeType } from "@/components/ui/ProjectCardBadge";
import ProjectCardBadge from "@/components/ui/ProjectCardBadge";
import Image from "next/image";

type Badge = {
    type: BadgeType;
    text?: string;
};

export type ProjectCardStaticProps = {
    imageSrc?: string;
    information: ProjectCardBottomInformationProps;
    badges?: Badge[];
};

export default function ProjectCardStatic({
    imageSrc = "/static/images/placeholder.png",
    information = {
        projectName: "서비스명",
        projectDescription: "서비스 한 줄 설명을 적어주세요",
        projectYear: "13기",
    },
    badges = [],
}: ProjectCardStaticProps) {
    return (
        <div className="relative flex flex-col w-full bg-gray-6 hover:bg-gray-6/50 rounded-[20px] overflow-hidden cursor-pointer transition-colors duration-200">
            <ProjectCardTopImage imageSrc={imageSrc} />

            <div className="flex flex-col items-start justify-center px-4.5 py-4 gap-4">
                <ProjectCardBottomInformation
                    projectName={information.projectName}
                    projectDescription={information.projectDescription}
                    projectYear={information.projectYear}
                />

                <div className="flex items-center justify-start gap-[3px]">
                    {badges.map((badge, index) => (
                        <ProjectCardBadge key={index} type={badge.type} text={badge.text} dark />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProjectCardTopImage({ imageSrc }: { imageSrc: string }) {
    return (
        <div className="flex items-center justify-center w-full h-[186px]">
            <Image
                src={imageSrc}
                alt="Project Image"
                className="object-cover w-full h-full"
                height={186}
                width={330}
                draggable={false}
            />
        </div>
    );
}

type ProjectCardBottomInformationProps = {
    projectName: string;
    projectDescription: string;
    projectYear: string;
};

function ProjectCardBottomInformation({
    projectName,
    projectDescription,
    projectYear,
}: ProjectCardBottomInformationProps) {
    return (
        <div className="flex flex-col w-full gap-2 items-start justify-center">
            <div className="flex items-center justify-between w-full">
                <p className="text-white body3_m">{projectName}</p>

                <ProjectYearBadge projectYear={projectYear} />
            </div>

            <p className="body5_r text-gray-2">{projectDescription}</p>
        </div>
    );
}

function ProjectYearBadge({ projectYear }: { projectYear: string }) {
    return (
        <div className="flex items-center justify-center px-2 py-1 bg-[#191919] rounded-[12px]">
            <p className="text-white body6_r">{projectYear}</p>
        </div>
    );
}
