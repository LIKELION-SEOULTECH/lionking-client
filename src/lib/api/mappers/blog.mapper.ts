import { extractSummary, getFullS3Url } from "@/lib/utils";
import type { BlogContent, PostPreviewMetadata, PostTypes } from "@/types";

const blogTypeApiToPostTypeMap: Record<string, PostTypes> = {
    ARTICLE: "article",
    SESSION: "session",
};

type BlogAPIResponse = {
    id: number;
    authorId: number;
    blogType: string;
    title: string;
    content: string;
    thumbnailImage: string;
    contentMedia: {
        id: number;
        s3Key: string;
        mediaType: string;
    }[];
};

export function blogMetaMapper(blog: BlogAPIResponse): PostPreviewMetadata {
    return {
        postId: blog.id,
        postType: blogTypeApiToPostTypeMap[blog.blogType] ?? "article",
        part: "기획",
        title: blog.title,
        description: extractSummary(blog.content, 30),
        date: new Date().toISOString().split("T")[0],
        authorName: `작성자${blog.authorId}`,
        authorId: blog.authorId,
        imageUrl: getFullS3Url(blog.thumbnailImage),
        postHref: `/blog/${blog.id}`,
    };
}

export function blogMapper(blog: BlogAPIResponse): BlogContent {
    return {
        blogId: blog.id,
        blogType: blogTypeApiToPostTypeMap[blog.blogType] ?? "article",
        title: blog.title,
        content: blog.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
            id: blog.authorId,
            name: `작성자${blog.authorId}`,
            position: "기획(기본)",
        },
        thumbnail: getFullS3Url(blog.thumbnailImage) ?? "",
        goal: [""],
        summary: [""],
    };
}
