import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { projectTypeEnumToLabel, type Project } from "@/types";
import { parsePublicUrlFromPresignedUrl } from "@/lib/utils";
import ProjectEditButton from "./ProjectEditButton";

type ProjectDetailProps = {
    project: Project;
};

export default function ProjectDetailMeta({ project }: ProjectDetailProps) {
    return (
        <div className="flex flex-col items-start justify-start w-full gap-10">
            <div className="flex flex-col items-start justify-start w-full gap-8">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-white head3_sb">{project.title}</h1>
                    <ProjectEditButton projectId={project.id} />
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-start gap-3">
                        <ProjectDetailPageTagItem tag={`${project.generation}기`} />
                        <ProjectDetailPageTagItem
                            tag={projectTypeEnumToLabel[project.projectType]}
                        />
                    </div>
                    {project.videoLink && (
                        <Link
                            className="flex items-center justify-center gap-1 px-4.5 py-2.5 bg-gray-7 rounded-full text-white sub3_sb hover:bg-gray-6 transition-colors duration-200"
                            target="_blank"
                            href={project.videoLink}
                        >
                            <p>시연 영상 보러가기</p>
                            <ChevronRight size={20} />
                        </Link>
                    )}
                </div>
            </div>

            <div className="relative flex items-center justify-center w-full overflow-hidden aspect-video">
                <Image
                    src={parsePublicUrlFromPresignedUrl(project.thumbnail)}
                    alt={project.title}
                    fill
                />
            </div>

            <div className="w-full flex items-center justify-center px-12.75 py-10 border border-gray-5 rounded-[20px]">
                <div className="flex flex-col items-start justify-center w-full gap-10">
                    <div className="w-full flex items-center justify-start gap-22.5">
                        <p className="text-white sub2_sb">팀원</p>

                        <ul className="flex flex-wrap gap-x-1.5 after:content-none body3_r text-gray-1">
                            {project.participations.map((p) => (
                                <li
                                    key={p.memberId}
                                    className="after:content-[','] last:after:content-none"
                                >
                                    {p.username}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-white body3_r break-keep">{project.description}</p>
                </div>
            </div>
        </div>
    );
}

function ProjectDetailPageTagItem({ tag }: { tag: string }) {
    return (
        <div className="flex items-center justify-center px-3.5 py-2 bg-gray-5 rounded-full">
            <p className="text-white body4_m">{tag}</p>
        </div>
    );
}
