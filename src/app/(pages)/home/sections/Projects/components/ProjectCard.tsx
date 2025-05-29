"use client";

import Image from "next/image";
import { motion } from "motion/react";
import useHoverAnimation from "@/hooks/animations/useHoverAnimation";
import ProjectCardBadge from "@/components/ui/ProjectCardBadge";
import { ProjectPreviewBadgeType } from "@/types";

export type ProjectCardProps = {
    imageSrc?: string;
    information: ProjectCardBottomInformationProps;
    badge?: ProjectPreviewBadgeType;
};

export default function ProjectCard({
    imageSrc = "/static/images/330x186.svg",
    information = {
        projectName: "서비스명",
        projectDescription: "서비스 한 줄 설명을 적어주세요",
        projectYear: "13기",
    },
    badge = "NONE",
}: ProjectCardProps) {
    const { ref } = useHoverAnimation<HTMLDivElement>();

    return (
        <motion.div
            ref={ref}
            className="relative flex flex-col w-[330px] bg-gray-6 hover:bg-gray-6/50 rounded-[20px] overflow-hidden cursor-pointer transition-colors duration-200"
        >
            <div className="absolute z-10 top-3 left-3">
                <ProjectCardBadge type={badge} />
            </div>

            <ProjectCardTopImage imageSrc={imageSrc} />

            <ProjectCardBottomInformation
                projectName={information.projectName}
                projectDescription={information.projectDescription}
                projectYear={information.projectYear}
            />
        </motion.div>
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
        <div className="flex flex-col w-full gap-[3px] items-start justify-center px-4.5 py-5">
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
