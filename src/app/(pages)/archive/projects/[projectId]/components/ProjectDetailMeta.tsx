import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { projectTypeEnumToLabel, type Project } from "@/types";

type ProjectDetailProps = {
    project: Project;
};

export default function ProjectDetailMeta({ project }: ProjectDetailProps) {
    return (
        <div className="w-full flex flex-col items-start justify-start gap-10">
            <div className="w-full flex flex-col items-start justify-start gap-8">
                <h1 className="head3_sb text-white">{project.title}</h1>
                <div className="w-full flex items-center justify-between">
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

            <div className="relative flex items-center justify-center overflow-hidden w-full aspect-video">
                <Image src={project.thumbnail} alt={project.title} fill />
            </div>

            <div className="w-full flex items-center justify-center px-12.75 py-10 border border-gray-5 rounded-[20px]">
                <div className="w-full flex flex-col gap-10 items-start justify-center">
                    <div className="w-full flex items-center justify-start gap-22.5">
                        <p className="sub2_sb text-white">팀원</p>

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

                    <p className="body3_r text-white break-keep">{project.description}</p>
                </div>
            </div>
        </div>
    );
}

function ProjectDetailPageTagItem({ tag }: { tag: string }) {
    return (
        <div className="flex items-center justify-center px-3.5 py-2 bg-gray-5 rounded-full">
            <p className="body4_m text-white">{tag}</p>
        </div>
    );
}
