import ProjectCardBadge from "@/components/ui/ProjectCardBadge";
import { ProjectPreviewMetadata, ProjectCardVariants } from "@/types";
import Image from "next/image";
import Link from "next/link";

type ProjectCardStaticProps = {
    variant?: ProjectCardVariants;
};

const textStylesMap = {
    title: {
        PROJECT_PAGE: "text-white body3_m hover:underline",
        MEMBER_PAGE: "text-white sub3_sb hover:underline",
    },
    description: {
        PROJECT_PAGE: "body5_r text-gray-2",
        MEMBER_PAGE: "body6_r text-gray-3",
    },
    year: {
        PROJECT_PAGE: "text-white body6_r",
        MEMBER_PAGE: "text-white body6_r",
    },
    tag: {
        PROJECT_PAGE: "caption8_m text-gray-1",
        MEMBER_PAGE: "caption8_m text-gray-1",
    },
};

export default function ProjectCardStatic({
    title,
    description,
    projectYear,
    badges,
    imageUrl,
    postHref,
    variant,
}: ProjectPreviewMetadata & ProjectCardStaticProps) {
    return (
        <Link
            href={postHref ?? "#"}
            className={`relative flex flex-col w-full ${
                variant === "MEMBER_PAGE"
                    ? "bg-transparent border border-gray-5"
                    : "bg-gray-6 hover:bg-gray-6/50"
            } rounded-[20px] overflow-hidden cursor-pointer transition-colors duration-200`}
        >
            <ProjectCardTopImage imageSrc={imageUrl ?? "/static/images/placeholder.png"} />

            <div className="flex flex-col items-start justify-center px-4.5 py-4 gap-4">
                <ProjectCardBottomInformation
                    projectName={title}
                    projectDescription={description}
                    projectYear={projectYear}
                    variant={variant}
                />

                <div className="flex items-center justify-start gap-[3px]">
                    {badges &&
                        badges.map((badge, index) => (
                            <ProjectCardBadge
                                key={index}
                                type={badge.type}
                                text={badge.text}
                                dark={badge.dark}
                                variant={variant}
                            />
                        ))}
                </div>
            </div>
        </Link>
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
    variant?: ProjectCardVariants;
};

function ProjectCardBottomInformation({
    projectName,
    projectDescription,
    projectYear,
    variant = "PROJECT_PAGE",
}: ProjectCardBottomInformationProps) {
    return (
        <div className="flex flex-col w-full gap-2 items-start justify-center">
            <div className="flex items-center justify-between w-full">
                <p className={textStylesMap.title[variant]}>{projectName}</p>

                <ProjectYearBadge projectYear={projectYear} />
            </div>

            <p className={textStylesMap.description[variant]}>{projectDescription}</p>
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
