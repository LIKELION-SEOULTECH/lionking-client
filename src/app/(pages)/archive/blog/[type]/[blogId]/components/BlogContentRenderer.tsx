import { BlogContent, positionEnumToLabel } from "@/types";
import Image from "next/image";
import Link from "next/link";
import BlogEditButton from "./BlogEditButton";

export default function BlogContentRenderer({ blog }: { blog: BlogContent }) {
    const { blogId, title, author, thumbnail, content, createdAt, summary } = blog;

    return (
        <>
            <div className="relative w-full aspect-[2/1] overflow-hidden">
                <Image src={thumbnail} alt={title} fill />
            </div>

            <div className="flex flex-col items-start justify-start w-full gap-4">
                <div className="w-full flex items-center justify-between">
                    <p className="body3_r text-orange-main">
                        {positionEnumToLabel[author.position]}
                    </p>
                    <BlogEditButton blogId={blogId} />
                </div>
                <h1 className="text-black head3_sb">{title}</h1>
                <div className="flex items-center gap-2 body3_r">
                    <Link href={`/about/members/${author.id}`}>
                        <span className="text-black hover:underline">by {author.name}</span>
                    </Link>
                    <span className="text-gray-5">{createdAt}</span>
                </div>
            </div>

            <article className="prose prose-sm w-full max-w-[1100px]">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>

            <div className="w-full flex flex-col items-start justify-start gap-6 px-8 py-6 bg-gray-1 rounded-[20px] text-black">
                <p className="sub2_sb">💡 AI 요약</p>

                <ul className="list-disc list-inside body3_r">{summary}</ul>
            </div>
        </>
    );
}
