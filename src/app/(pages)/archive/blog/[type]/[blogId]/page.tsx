import BlogContentRenderer from "./components/BlogContentRenderer";
import BlogShareButton from "./components/BlogShareButton";
import BlogSuggestion from "./components/BlogSuggestion";
import { get_blog, get_blog_blogId } from "@/lib/api/endpoints/blog";

export default async function BlogDetailPage({ params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = await params;

    const blog = await get_blog_blogId(blogId);

    return (
        <>
            <BlogContentRenderer blog={blog} />

            <BlogShareButton
                currentBlogId={blogId}
                title={blog.title}
                description={blog.summary[0]}
            />

            <div className="relative w-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-screen h-5 bg-gray-1" />
            </div>

            <BlogSuggestion currentBlogId={blogId} />
        </>
    );
}

export function generateStaticParams() {
    const allBlogIds = get_blog().then((blogs) => {
        return blogs.map((blog) => ({
            type: blog.postType,
            blogId: blog.postId.toString(),
        }));
    });

    return allBlogIds;
}
