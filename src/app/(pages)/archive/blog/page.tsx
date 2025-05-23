import blogMock from "@/__mocks__/blogMock";
import ArchivePostPreviewDisplay from "./components/ArchiveBlogPreviewDisplay";

export default function ArchivePage() {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-[120px] py-[120px]">
            <ArchivePostPreviewDisplay
                displayTitle="인기있는 게시물을 만나보세요!"
                layout="DYNAMIC"
                posts={blogMock.slice(0, 3)}
            />

            <ArchivePostPreviewDisplay
                displayTitle="세션"
                viewMoreHref="/archive/blog/session"
                layout="VERTICAL"
                posts={blogMock.slice(0, 3)}
            />

            <ArchivePostPreviewDisplay
                displayTitle="아티클"
                viewMoreHref="/archive/blog/article"
                layout="VERTICAL"
                posts={blogMock.slice(0, 3)}
            />
        </div>
    );
}
