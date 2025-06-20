"use client";

import EmptyViews from "@/components/ui/EmptyViews";
import PostPreviewItem from "@/components/ui/PostPreviewItem";
import { PostPreviewMetadata } from "@/types";

const mockPublishedBlogs: PostPreviewMetadata[] = [
    {
        part: "프론트엔드",
        title: "리액트로 블로그 만들기",
        description: "리액트로 블로그를 만드는 방법에 대해 알아봅시다.",
        date: "2023-10-01",
        authorId: 1,
        authorName: "김먀옹",
    },
    {
        part: "백엔드",
        title: "Node.js로 서버 구축하기",
        description: "Node.js를 사용하여 간단한 서버를 구축하는 방법을 알아봅시다.",
        date: "2023-10-02",
        authorId: 1,
        authorName: "김먀옹",
    },
];

export default function DashboardViewAllPublishedPage() {
    const publishedBlogs = mockPublishedBlogs;

    return (
        <div className="bg-white text-black overflow-hidden">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 pt-30 pb-32">
                <div className="flex flex-col items-center justify-center w-full gap-12.5">
                    <h1 className="head3_sb text-black w-full">내 블로그 관리</h1>

                    <div className="w-full flex flex-col items-center justify-center gap-9">
                        {publishedBlogs && publishedBlogs.length > 0 ? (
                            publishedBlogs.map((blog, idx) => (
                                <PostPreviewItem
                                    key={idx}
                                    layout="horizontal_fill_small"
                                    part={blog.part}
                                    title={blog.title}
                                    description={blog.description}
                                    date={blog.date}
                                    authorId={blog.authorId}
                                    authorName={blog.authorName}
                                    withAction
                                />
                            ))
                        ) : (
                            <div className="w-full flex items-center justify-center h-[50vh]">
                                <EmptyViews for="blogs" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
