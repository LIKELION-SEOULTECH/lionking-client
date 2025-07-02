import EmptyViews from "@/components/ui/EmptyViews";
import PostPreviewItem from "@/components/ui/PostPreviewItem";
import { getMe } from "@/lib/api/auth";
import { get_blog_author_authorId } from "@/lib/api/endpoints/blog";
import { redirect } from "next/navigation";

export default async function DashboardViewAllPublishedPage() {
    const me = await getMe();

    if (!me) return redirect("/login");

    const publishedBlogs = await (async () => {
        try {
            const result = await get_blog_author_authorId(me.id);
            return result ?? [];
        } catch {
            return [];
        }
    })();

    return (
        <div className="overflow-hidden text-black bg-white">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 pt-30 pb-32">
                <div className="flex flex-col items-center justify-center w-full gap-12.5">
                    <h1 className="w-full text-black head3_sb">내 블로그 관리</h1>

                    <div className="flex flex-col items-center justify-center w-full gap-9">
                        {publishedBlogs && publishedBlogs.length > 0 ? (
                            publishedBlogs.map((blog, idx) => (
                                <PostPreviewItem
                                    key={idx}
                                    postId={blog.postId}
                                    postType={blog.postType}
                                    layout="horizontal_fill_small"
                                    part={blog.part}
                                    title={blog.title}
                                    description={blog.description}
                                    date={blog.date}
                                    authorId={blog.authorId}
                                    authorName={blog.authorName}
                                    postHref={`/archive/blog/session/${blog.postId}`}
                                    withAction
                                />
                            ))
                        ) : (
                            <div className="w-full flex items-center justify-center h-[50vh]">
                                <EmptyViews for="blogs" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
