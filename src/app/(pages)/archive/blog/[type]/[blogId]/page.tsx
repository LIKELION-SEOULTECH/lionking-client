import { notFound } from "next/navigation";
import BlogContentRenderer from "./components/BlogContentRenderer";
import BlogShareButton from "./components/BlogShareButton";
import BlogSuggestion from "./components/BlogSuggestion";
import { get_blog, get_blog_blogId } from "@/lib/api/endpoints/blog";

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ type: string; blogId: string }>;
}) {
    const { type, blogId } = await params;

    let blog;

    try {
        blog = await get_blog_blogId(blogId);
    } catch (error) {
        console.error(error);
        return notFound();
    }

    if (!blog || blog.blogType !== type) {
        return notFound();
    }

    return (
        <>
            <BlogContentRenderer blog={blog} />

            <BlogShareButton
                currentBlogId={blogId}
                title={blog.title}
                description={blog.summary[0]}
            />

            <div className="relative w-full">
                <div className="absolute w-screen h-5 -translate-x-1/2 left-1/2 bg-gray-1" />
            </div>

            <BlogSuggestion currentBlogId={blogId} />
        </>
    );
}

export async function generateStaticParams() {
    const blogs = await (async () => {
        try {
            const result = await get_blog();
            return result ?? [];
        } catch {
            return [];
        }
    })();

    if (!blogs || !Array.isArray(blogs)) {
        return [];
    }

    return blogs.map((blog) => ({
        type: blog.postType,
        blogId: blog.postId.toString(),
    }));
}
