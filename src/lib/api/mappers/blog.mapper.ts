import { BlogFormValues } from "@/components/forms/configs/blogFormConfig";
import { extractSummary, getFullS3Url } from "@/lib/utils";
import type { BlogContent, Parts, PostPreviewMetadata, PostTypes } from "@/types";

const blogTypeApiToPostTypeMap: Record<string, PostTypes> = {
    ARTICLE: "article",
    SESSION: "session",
};

export type BlogAPIResponse = {
    id: number;
    authorId: number;
    blogType: string;
    title: string;
    content: string;
    summary: string;
    thumbnailImage: string;
    // contentMedia: {
    //     id: number;
    //     s3Key: string;
    //     mediaType: string;
    // }[];
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
        description: blog.summary || extractSummary(blog.content, 30),
        date: blog.createdAt,
        authorName: blog.MemberName,
        authorId: blog.authorId,
        imageUrl: getFullS3Url(blog.thumbnailImage),
        postHref: `/blog/${blogTypeApiToPostTypeMap[blog.blogType]}/${blog.id}`,
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
        summary: blog.summary,
    };
}

export async function blogContentToFormValues(blog: BlogContent): Promise<BlogFormValues> {
    return {
        title: blog.title,
        category: blog.blogType,
        thumbnail: blog.thumbnail,
        content: blog.content,
        authorId: blog.author.id,
    };
}
