"use client";

import { useState } from "react";
import { BlogTypeFilters, PartFilters } from "@/types";
import BlogTypeSelector from "./BlogTypeSelector";
import BlogPreviewSectionHeader from "./BlogPreviewSectionHeader";
import PartSelector from "./PartSelector";
import PostPreviewItem from "@/components/ui/PostPreviewItem";
import BlogPreviewListEmpty from "./BlogPreviewListEmpty";

import blogMock from "@/__mocks__/blogMock";

type BlogListProps = {
    selectedBlogType: BlogTypeFilters;
};

export default function BlogList({ selectedBlogType }: BlogListProps) {
    const [selectedPart, setSelectedPart] = useState<PartFilters>("파트");

    const filteredPosts = blogMock
        .filter((post) => selectedPart === "파트" || post.part === selectedPart)
        .filter((post) => post.blogType === selectedBlogType);

    return (
        <>
            <BlogTypeSelector selectedBlogType={selectedBlogType} />

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
