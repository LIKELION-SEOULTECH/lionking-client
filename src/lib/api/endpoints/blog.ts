import { createFetchClient } from "@/lib/api/fetchJson";
import { blogMapper, blogMetaMapper } from "../mappers/blog.mapper";
import { PostPreviewMetadata } from "@/types";

export type PostBlogRequest = {
    blogType: "ARTICLE" | "SESSION";
    title: string;
    content: string;
    thumbnailImage: string;
    contentMedia?: {
        s3Key: string;
        mediaType: "IMAGE";
    }[];
};

export async function post_blog_authorId(authorId: string | number, body: PostBlogRequest) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/blog/${authorId}`, {
        method: "POST",
        body,
    });
}

export async function get_blog_blogId(blogId: string | number) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/blog/${blogId}`, {
        method: "GET",
    }).then((res) => blogMapper(res.data));
}

export async function delete_blog_blogId(blogId: string | number) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/blog/${blogId}`, {
        method: "DELETE",
    });
}

export async function patch_blog_blogId(blogId: string | number, body: any) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/blog/${blogId}`, {
        method: "PATCH",
        body,
    });
}

export async function get_blog() {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/blog", {
        method: "GET",
    }).then((res) => res.data.map(blogMetaMapper) as PostPreviewMetadata[]);
}

export async function get_blog_author_authorId(authorId: string | number) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/blog/author/${authorId}`, {
        method: "GET",
    }).then((res) => res.data.map(blogMetaMapper) as PostPreviewMetadata[]);
}
