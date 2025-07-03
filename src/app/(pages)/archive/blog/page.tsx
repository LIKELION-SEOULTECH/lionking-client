import EmptyViews from "@/components/ui/EmptyViews";
import ArchiveBlogBanner from "./components/ArchiveBlogBanner";
import ArchivePostPreviewDisplay from "./components/ArchiveBlogPreviewDisplay";
import { get_blog } from "@/lib/api/endpoints/blog";

export const revalidate = 60;

export default async function ArchiveBlogPage() {
    const blogs = await (async () => {
        try {
            const result = await get_blog();
            return result ?? [];
        } catch {
            return [];
        }
    })();

    return (
        <div className="w-full bg-white">
            <ArchiveBlogBanner />
            <div className="flex flex-col items-center justify-center w-full gap-[120px] py-[120px]">
                {blogs && blogs.length > 0 ? (
                    <>
                        <ArchivePostPreviewDisplay
                            displayTitle="인기있는 게시물을 만나보세요!"
                            layout="DYNAMIC"
                            posts={blogs.slice(0, 3)}
                        />

                        <ArchivePostPreviewDisplay
                            displayTitle="세션"
                            viewMoreHref="/archive/blog/session"
                            layout="VERTICAL"
                            posts={blogs.filter((post) => post.postType === "session")}
                        />

                        <ArchivePostPreviewDisplay
                            displayTitle="아티클"
                            viewMoreHref="/archive/blog/article"
                            layout="VERTICAL"
                            posts={blogs.filter((post) => post.postType === "article")}
                        />
                    </>
                ) : (
                    <div className="w-full flex items-center justify-center h-[30vh]">
                        <EmptyViews for="blogs" />
                    </div>
                )}
            </div>
        </div>
    );
}
