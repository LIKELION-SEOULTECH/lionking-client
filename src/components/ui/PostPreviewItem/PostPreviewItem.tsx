import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { positionEnumToLabel, PostPreviewMetadata } from "@/types";
import { previewItemVariants, PostPreviewLayout, styleMap } from "./PostPreviewItemVariants";
import PostEditButton from "./PostEditButton";

export type PostPreviewItemProps = PostPreviewMetadata & {
    layout: PostPreviewLayout;
    withAction?: boolean;
};

export default function PostPreviewItem({
    postId,
    postType,
    layout = "vertical_small",
    part,
    title,
    description,
    date,
    authorName,
    authorId,
    imageUrl = "/static/images/placeholder.png",
    withAction = false,
}: PostPreviewItemProps) {
    const styles = styleMap[layout];

    const isHorizontal = layout.startsWith("horizontal");
    const isCompact = layout.includes("compact");
    const isVerticalCompactDark = layout === "vertical_compact_dark";

    const imageWrapperClass = cn(
        "relative overflow-hidden shrink-0",
        layout === "horizontal_fill_large" && "w-full sm:w-[361px] h-[217px]",
        layout === "horizontal_fill_small" && "w-full sm:w-[273px] h-[193px]",
        layout === "horizontal_compact" && "w-full sm:w-[286px] h-[172px]",
        layout === "vertical_large" && "w-full h-[268px]",
        layout === "vertical_small" && "w-full h-[200px]",
        layout === "vertical_compact" && "w-full h-[200px]",
        layout === "vertical_compact_dark" && "w-full h-[186px]"
    );

    return (
        <div
            className="relative flex flex-col items-center justify-center w-full"
            data-id={`post-preview-${postId}`}
        >
            {layout === "horizontal_fill_large" && (
                <div className="w-full h-[1px] bg-gray-2 hidden lg:block" />
            )}
            <div className={cn(previewItemVariants({ layout }))}>
                <div className={imageWrapperClass}>
                    <Link href={`/archive/blog/${postType}/${postId}`}>
                        <Image src={imageUrl} alt={title} fill className="object-cover" />
                    </Link>
                </div>

                <div
                    className={cn(
                        "flex flex-col w-full",
                        isHorizontal ? (isCompact ? "gap-2" : "gap-10") : "gap-2",
                        isVerticalCompactDark && "px-4.5 pb-4"
                    )}
                >
                    <div className="flex flex-col w-full gap-2">
                        {styles.partPosition == "TOP" && (
                            <div className="flex items-center justify-between w-full">
                                <p className={styles.part}>{positionEnumToLabel[part]}</p>

                                <PostEditButton postId={postId} />
                            </div>
                        )}
                        <div className="flex flex-col gap-4">
                            <Link
                                href={`/archive/blog/${postType}/${postId}`}
                                className={cn(styles.title, "hover:underline")}
                            >
                                <p className={styles.title}>{title}</p>
                            </Link>
                            <p className={styles.desc}>{description}</p>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "flex items-center",
                            isHorizontal ? (isCompact ? "gap-2.5" : "gap-[10px]") : "gap-2.5"
                        )}
                    >
                        <p className={styles.meta}>{date}</p>
                        {authorName && styles.partPosition !== "NONE" && (
                            <>
                                <div className="h-[17px] w-[1.5px] bg-gray-3" />
                                <div className="flex items-center gap-1">
                                    {styles.partPosition == "BOTTOM" && (
                                        <span className={cn(styles.part)}>
                                            {positionEnumToLabel[part]}
                                        </span>
                                    )}
                                    <Link
                                        href={`/about/members/${authorId}`}
                                        className={cn(styles.meta, "hover:underline")}
                                    >
                                        {authorName}
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
