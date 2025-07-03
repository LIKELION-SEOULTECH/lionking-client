"use client";

import ChevronRightSVG from "@/assets/icons/chevron-right.svg";
import EmptyViews from "@/components/ui/EmptyViews";
import PostPreviewItem from "@/components/ui/PostPreviewItem";
import { PostPreviewMetadata } from "@/types";
import Link from "next/link";

type DashboardPublishedBlogsProps = {
    publishedBlogs: PostPreviewMetadata[] | null;
};

export default function DashboardPublishedBlogs({ publishedBlogs }: DashboardPublishedBlogsProps) {
    return (
        <div className="w-full pt-7 px-0 lg:px-9 pb-11 flex flex-col items-center justify-center gap-[35px] bg-white rounded-[20px] shadow-none lg:shadow-sm">
            <div className="flex items-center justify-between w-full">
                <h2 className="sub2_sb text-gray-8">내가 작성한 블로그</h2>
                <Link href="/dashboard/published">
                    <button className="sub3_sb text-gray-4 bg-gray-1 hover:bg-gray-2/80 flex items-center justify-center py-2 pl-3.5 pr-2 rounded-full cursor-pointer transition-colors duration-200">
                        <span>더보기</span>
                        <ChevronRightSVG />
                    </button>
                </Link>
            </div>

            <div className="flex flex-col items-start justify-start w-full gap-10">
                {publishedBlogs && publishedBlogs.length > 0 ? (
                    publishedBlogs.map((blog, idx) => (
                        <PostPreviewItem
                            key={idx}
                            postId={blog.postId}
                            postType={blog.postType}
                            layout="horizontal_fill_small"
                            part={blog.part}
                            title={blog.title}
                            description={blog.description}
                            date={blog.date}
                            authorId={blog.authorId}
                            authorName={blog.authorName}
                            postHref={`/archive/blog/session/${blog.postId}`}
                            withAction
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-center w-full py-36">
                        <EmptyViews for="blogs" />
                    </div>
                )}
            </div>
        </div>
    );
}
