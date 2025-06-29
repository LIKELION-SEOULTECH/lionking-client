import { fetchJson } from "@/lib/api/fetchJson";

export async function post_blog_authorId(authorId: string | number, body: any) {
    return fetchJson(`/api/v1/blog/${authorId}`, {
        method: "POST",
        body,
    });
}

export async function get_blog_blogId(blogId: string | number) {
    return fetchJson(`/api/v1/blog/${blogId}`, {
        method: "GET",
    });
}

export async function delete_blog_blogId(blogId: string | number) {
    return fetchJson(`/api/v1/blog/${blogId}`, {
        method: "DELETE",
    });
}

export async function patch_blog_blogId(blogId: string | number, body: any) {
    return fetchJson(`/api/v1/blog/${blogId}`, {
        method: "PATCH",
        body,
    });
}

export async function get_blog() {
    return fetchJson("/api/v1/blog", {
        method: "GET",
    });
}

export async function get_blog_author_authorId(authorId: string | number) {
    return fetchJson(`/api/v1/blog/author/${authorId}`, {
        method: "GET",
    });
}
