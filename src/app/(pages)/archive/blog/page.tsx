import ArchiveBlogBanner from "./components/ArchiveBlogBanner";
import ArchivePostPreviewDisplay from "./components/ArchiveBlogPreviewDisplay";
import { get_blog } from "@/lib/api/endpoints/blog";

export default async function ArchiveBlogPage() {
    const blogs = await get_blog();

    return (
        <div className="bg-white w-full">
            <ArchiveBlogBanner />
            <div className="flex flex-col items-center justify-center w-full gap-[120px] py-[120px]">
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
            </div>
        </div>
    );
}
