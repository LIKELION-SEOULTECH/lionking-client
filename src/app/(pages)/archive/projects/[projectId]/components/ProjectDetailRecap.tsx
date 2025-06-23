import { Member } from "@/types";
import Link from "next/link";

export type ProjectDetailRecapItemProps = {
    author: Member;
    content: string;
};

export type ProjectDetailRecapProps = {
    recaps: ProjectDetailRecapItemProps[];
};

export default function ProjectDetailRecap({ recaps }: ProjectDetailRecapProps) {
    return (
        <div className="w-full flex flex-col items-center justify-start gap-10">
            <h2 className="head3_sb text-white">프로젝트 회고</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {recaps.map((recap, index) => (
                    <ProjectDetailRecapItem
                        key={index}
                        author={recap.author}
                        content={recap.content}
                    />
                ))}
            </div>
        </div>
    );
}

function ProjectDetailRecapItem({ author, content }: ProjectDetailRecapItemProps) {
    return (
        <div className="flex flex-col items-start justify-start gap-5 bg-gray-5 px-7 py-6 rounded-[40px] rounded-bl-none cursor-default hover:bg-gray-5/80 transition-colors duration-200">
            <Link href={`/about/members/${author.id}`}>
                <p className="body3_m text-white hover:underline">
                    {author.name} / {author.position}
                </p>
            </Link>

            <p className="body5_r text-white break-keep">{content}</p>
        </div>
    );
}
