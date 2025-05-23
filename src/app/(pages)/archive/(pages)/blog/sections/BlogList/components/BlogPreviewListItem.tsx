import { Parts } from "@/types";
import Image from "next/image";
import Link from "next/link";

export type BlogPreviewListItemProps = {
    part: string | Parts;
    title: string;
    description: string;
    date: string;
    authorName: string;
    authorId: string;
};

export default function BlogPreviewListItem({
    part,
    title,
    description,
    date,
    authorName,
    authorId,
}: BlogPreviewListItemProps) {
    return (
        <div className="relative w-full">
            <div className="w-full h-[1px] bg-gray-2" />
            <div className="flex items-center justify-between w-full py-9">
                <div className="flex flex-col items-start justify-center gap-10">
                    <div className="flex flex-col items-start justify-center gap-2">
                        <p className="body3_m text-orange-main">{part}</p>

                        <div className="flex flex-col items-start justify-center gap-4">
                            <p className="head5_sb text-gray-8">{title}</p>

                            <p className="body3_r text-gray-5">{description}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3.5 body5_r text-gray-4">
                        <p>{date}</p>

                        <div className="h-[17px] w-[1.5px] bg-gray-3" />

                        <Link
                            href={`/about/members/${authorId}`}
                            className="hover:underline cursor-pointer"
                        >
                            {authorName}
                        </Link>
                    </div>
                </div>

                <div className="h-[217px] w-[361px] relative overflow-hidden">
                    <Image
                        src="/static/images/placeholder.png"
                        alt={`Thumbnail image of ${title}`}
                        fill
                    />
                </div>
            </div>
        </div>
    );
}
