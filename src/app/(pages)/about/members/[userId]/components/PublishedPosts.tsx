"use client";

import { useState } from "react";
import PublishedPostTypeSelector from "./PublishedPostTypeSelector";
import PostPreviewItem from "@/components/ui/PostPreviewItem";
import ProjectCardStatic from "@/components/ui/ProjectCardStatic";
import { MemberPublishedPostFilters } from "@/types";
import blogMock from "@/__mocks__/blogMock";
import projectMock from "@/__mocks__/projectMock";

export default function PublishedPosts() {
    const [publishedPostType, setPublishedPostType] =
        useState<MemberPublishedPostFilters>("참여 프로젝트");

    return (
        <div className="w-full flex flex-col items-start justify-start gap-10 mt-8 md:mt-0">
            <PublishedPostTypeSelector type={publishedPostType} onChange={setPublishedPostType} />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8.5 md:gap-y-10 place-items-center">
                {publishedPostType === "참여 프로젝트" &&
                    projectMock.map((project, idx) => (
                        <ProjectCardStatic key={idx} variant="MEMBER_PAGE" {...project} />
                    ))}

                {publishedPostType === "작성한 글" &&
                    blogMock.map((post, idx) => (
                        <PostPreviewItem key={idx} layout="vertical_compact_dark" {...post} />
                    ))}
            </div>
        </div>
    );
}
