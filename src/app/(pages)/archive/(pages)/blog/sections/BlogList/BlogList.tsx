"use client";

import { useState } from "react";
import { BlogTypeFilters, PartFilters } from "@/types";
import BlogTypeSelector from "./components/BlogTypeSelector";
import BlogPreviewSectionHeader from "./components/BlogPreviewSectionHeader";
import PartSelector from "./components/PartSelector";
import PostPreviewItem from "@/components/ui/PostPreviewItem";
import BlogPreviewListEmpty from "./components/BlogPreviewListEmpty";

import blogMock from "@/__mocks__/blogMock";

export default function BlogList() {
    const [selectedBlogType, setSelectedBlogType] = useState<BlogTypeFilters>("세션");
    const [selectedPart, setSelectedPart] = useState<PartFilters>("파트");

    const filteredPosts = blogMock
        .filter((post) => post.blogType === selectedBlogType)
        .filter((post) => selectedPart === "파트" || post.part === selectedPart);

    return (
        <>
            <BlogTypeSelector selectedBlogType={selectedBlogType} onChange={setSelectedBlogType} />

            <div className="max-w-[1100px] mx-auto py-[160px]">
                <div className="flex flex-col w-full items-end justify-between mb-[120px]">
                    <BlogPreviewSectionHeader selectedBlogType={selectedBlogType} />

                    <PartSelector value={selectedPart} onChange={setSelectedPart} />
                </div>

                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostPreviewItem
                            layout="horizontal_fill_large"
                            key={post.title}
                            part={post.part}
                            title={post.title}
                            description={post.description}
                            date={post.date}
                            authorName={post.authorName}
                            authorId={post.authorId}
                        />
                    ))
                ) : (
                    <BlogPreviewListEmpty />
                )}
            </div>
        </>
    );
}
