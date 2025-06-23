import { BlogContent } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function BlogContentRenderer({ blog }: { blog: BlogContent }) {
    const { title, author, thumbnail, content, updatedAt, goal, summary } = blog;

    const formattedUpdatedAt = new Intl.DateTimeFormat("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
    })
        .format(updatedAt)
        .replace(/\s/g, "");

    return (
        <>
            <div className="relative w-full aspect-[2/1] overflow-hidden">
                <Image src={thumbnail} alt={title} fill />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-4">
                <p className="body3_r text-orange-main">{author.position}</p>
                <h1 className="head3_sb text-black">{title}</h1>
                <div className="flex items-center gap-2 body3_r">
                    <Link href={`/about/members/${author.id}`}>
                        <span className="text-black hover:underline">by {author.name}</span>
                    </Link>
                    <span className="text-gray-5">{formattedUpdatedAt}</span>
                </div>

                <div className="w-full flex flex-col items-start justify-start gap-6 px-8 py-6 bg-gray-1 rounded-[20px] text-black">
                    <p className="sub2_sb">🧐 이 글을 읽고 나면?</p>

                    <ul className="body3_r list-disc list-inside">
                        {goal.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <article className="prose prose-sm w-full max-w-[1100px]">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>

            <div className="w-full flex flex-col items-start justify-start gap-6 px-8 py-6 bg-gray-1 rounded-[20px] text-black">
                <p className="sub2_sb">💡 AI 요약</p>

                <ul className="body3_r list-disc list-inside">
                    {summary.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
