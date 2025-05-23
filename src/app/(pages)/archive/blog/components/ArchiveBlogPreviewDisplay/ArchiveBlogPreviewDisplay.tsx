import { PostPreviewMetadata } from "@/types";
import Link from "next/link";
import ArrowRightGray from "@/assets/icons/ic_arrow2_right_gray.svg";
import PostPreviewItem from "@/components/ui/PostPreviewItem";

type ArchiveBlogPreviewDisplayProps = {
    layout: "DYNAMIC" | "VERTICAL";
    displayTitle: string;
    viewMoreHref?: string;
    posts: PostPreviewMetadata[];
};

export default function ArchiveBlogPreviewDisplay({
    layout,
    displayTitle,
    viewMoreHref,
    posts,
}: ArchiveBlogPreviewDisplayProps) {
    return (
        <div className="w-full max-w-[1100px]">
            <ArchiveBlogPreviewDisplayHeader
                displayTitle={displayTitle}
                viewMoreHref={viewMoreHref}
            />

            {layout === "VERTICAL" && (
                <div className="w-full grid grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <PostPreviewItem key={idx} layout="vertical_small" {...post} />
                    ))}
                </div>
            )}
        </div>
    );
}

function ArchiveBlogPreviewDisplayHeader({
    displayTitle,
    viewMoreHref,
}: {
    displayTitle: string;
    viewMoreHref?: string;
}) {
    return (
        <div className="w-full flex items-center justify-between mb-6">
            {viewMoreHref ? (
                <Link href={viewMoreHref}>
                    <h2 className="head3_sb text-black hover:underline">{displayTitle}</h2>
                </Link>
            ) : (
                <h2 className="head3_sb text-black">{displayTitle}</h2>
            )}

            {viewMoreHref && (
                <Link href={viewMoreHref}>
                    <div className="flex items-center justify-center gap-2 hover:underline body3_r text-gray-4">
                        <span>더보기</span>
                        <ArrowRightGray />
                    </div>
                </Link>
            )}
        </div>
    );
}
