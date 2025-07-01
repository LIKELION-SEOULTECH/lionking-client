import { extractSummary, getFullS3Url } from "@/lib/utils";
import type { BlogContent, Parts, PostPreviewMetadata, PostTypes } from "@/types";

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
    MemberName: string;
    position: string;
    createdAt: string;
};

export function blogMetaMapper(blog: BlogAPIResponse): PostPreviewMetadata {
    return {
        postId: blog.id,
        postType: blogTypeApiToPostTypeMap[blog.blogType] ?? "article",
        part: blog.position as Parts,
        title: blog.title,
        description: extractSummary(blog.content, 30),
        date: blog.createdAt,
        authorName: blog.MemberName,
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
        createdAt: blog.createdAt,
        author: {
            id: blog.authorId,
            name: blog.MemberName,
            position: blog.position as Parts,
        },
        thumbnail: getFullS3Url(blog.thumbnailImage) ?? "",
        goal: [""],
        summary: [""],
    };
}
