"use client";

import { useState } from "react";
import PublishedPostTypeSelector from "./PublishedPostTypeSelector";
import PostPreviewItem from "@/components/ui/PostPreviewItem";
import ProjectCardStatic from "@/components/ui/ProjectCardStatic";
import { MemberPublishedPostFilters, PostPreviewMetadata, ProjectPreviewMetadata } from "@/types";
import EmptyViews from "@/components/ui/EmptyViews";

export type PublishedPostsProps = {
    published: {
        projects: ProjectPreviewMetadata[];
        blog: PostPreviewMetadata[];
    };
};

export default function PublishedPosts({ published }: PublishedPostsProps) {
    const [publishedPostType, setPublishedPostType] =
        useState<MemberPublishedPostFilters>("참여 프로젝트");

    return (
        <div className="w-full flex flex-col items-start justify-start gap-10 mt-8 md:mt-0">
            <PublishedPostTypeSelector type={publishedPostType} onChange={setPublishedPostType} />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8.5 md:gap-y-10 place-items-center">
                {publishedPostType === "참여 프로젝트" &&
                    (!published.projects || published.projects.length === 0 ? (
                        <div className="w-full flex items-center justify-center scale-[0.85]">
                            <EmptyViews for="projects" theme="dark" />
                        </div>
                    ) : (
                        published.projects.map((project, idx) => (
                            <ProjectCardStatic key={idx} variant="MEMBER_PAGE" {...project} />
                        ))
                    ))}

                {publishedPostType === "작성한 글" &&
                    (!published.blog || published.blog.length === 0 ? (
                        <div className="w-full flex items-center justify-center scale-[0.85]">
                            <EmptyViews for="blogs" theme="dark" />
                        </div>
                    ) : (
                        published.blog.map((post, idx) => (
                            <PostPreviewItem key={idx} layout="vertical_compact_dark" {...post} />
                        ))
                    ))}
            </div>
        </div>
    );
}
