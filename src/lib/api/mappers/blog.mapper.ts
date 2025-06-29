import { extractSummary, getFullS3Url } from "@/lib/utils";
import type { PostPreviewMetadata, PostTypes } from "@/types";

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

export function blogMapper(blog: BlogAPIResponse): PostPreviewMetadata {
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
