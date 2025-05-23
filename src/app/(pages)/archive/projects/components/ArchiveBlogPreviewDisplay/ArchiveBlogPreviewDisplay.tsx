import { PostPreviewMetadata } from "@/types";
import Link from "next/link";
import ArrowRightGray from "@/assets/icons/ic_arrow2_right_gray.svg";
import PostPreviewItem from "@/components/ui/PostPreviewItem";

type ArchiveBlogPreviewDisplayLayout = "VERTICAL" | "DYNAMIC";

type ArchiveBlogPreviewDisplayProps = {
    layout: ArchiveBlogPreviewDisplayLayout;
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
        <div className="w-full max-w-[1100px] px-6 lg:px-4 xl:px-0 mx-auto">
            <ArchiveBlogPreviewDisplayHeader
                displayTitle={displayTitle}
                viewMoreHref={viewMoreHref}
            />

            {layout === "VERTICAL" && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 place-items-start">
                    {posts.map((post, idx) => (
                        <PostPreviewItem key={idx} layout="vertical_small" {...post} />
                    ))}
                </div>
            )}

            {layout === "DYNAMIC" && (
                <div className="w-full flex flex-col lg:grid lg:grid-cols-[5fr_6fr] gap-10 md:gap-12 items-center justify-center">
                    {posts.length > 0 && <PostPreviewItem layout="vertical_large" {...posts[0]} />}

                    <div className="flex flex-col gap-10 items-center w-full">
                        {posts.slice(1).map((post, idx) => (
                            <PostPreviewItem key={idx} layout="horizontal_compact" {...post} />
                        ))}
                    </div>
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
        <div className="w-full flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-y-2">
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
