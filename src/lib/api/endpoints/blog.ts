"use server";

import { createFetchClient } from "@/lib/api/fetchJson";
import { blogMapper, blogMetaMapper } from "../mappers/blog.mapper";
import { PostPreviewMetadata } from "@/types";

export type PostBlogRequest = {
    blogType: "ARTICLE" | "SESSION";
    title: string;
    content: string;
    thumbnailImage: string;
    // contentMedia?: {
    //     s3Key: string;
    //     mediaType: "IMAGE";
    // }[];
};

export async function post_blog_authorId(authorId: string | number, body: PostBlogRequest) {
    const fetchJson = await createFetchClient();

    fetchJson(`/api/v1/blog/${authorId}`, {
        method: "POST",
        body,
    });
}

export async function get_blog_blogId(blogId: string | number) {
    const fetchJson = await createFetchClient();

    const res = await fetchJson(`/api/v1/blog/${blogId}`, {
        method: "GET",
    });

    if (!res || !res.data) return null;

    try {
        return blogMapper(res.data);
    } catch (e) {
        console.warn("blogMapper failed:", e);
        return null;
    }
}

export async function delete_blog_blogId(blogId: string | number) {
    const fetchJson = await createFetchClient();

    const response = await fetchJson(`/api/v1/blog/${blogId}`, {
        method: "DELETE",
    });

    if (!response || !response.data) {
        return null;
    }

    return response;
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

    const res = await fetchJson(`/api/v1/blog`, {
        method: "GET",
    });

    if (!res || !res.data) return null;

    try {
        return res.data.map(blogMetaMapper) as PostPreviewMetadata[];
    } catch (e) {
        console.warn("blogMetaMapper failed:", e);
        return null;
    }
}

export async function get_blog_author_authorId(authorId: string | number) {
    const fetchJson = await createFetchClient();

    const res = await fetchJson(`/api/v1/blog/author/${authorId}`, {
        method: "GET",
    });

    if (!res || !res.data) return null;

    try {
        return res.data.map(blogMetaMapper) as PostPreviewMetadata[];
    } catch (e) {
        console.warn("blogMetaMapper failed:", e);
        return null;
    }
}
