import type { BlogTypeFilters, PostTypes } from "@/types";
import BlogTypeSelector from "./BlogTypeSelector";
import BlogPreviewSectionHeader from "./BlogPreviewSectionHeader";
import PostPreviewItem from "@/components/ui/PostPreviewItem";
import BlogPreviewListEmpty from "./BlogPreviewListEmpty";
import { get_blog } from "@/lib/api/endpoints/blog";

type BlogListProps = {
    selectedBlogType: BlogTypeFilters;
    // selectedPart: string;
};

export default async function BlogList({ selectedBlogType }: BlogListProps) {
    const allPosts = await get_blog();

    const blogTypeLabelMap: Record<BlogTypeFilters, string> = {
        all: "전체",
        session: "세션",
        article: "아티클",
    };

    const selectedBlogTypeLabel = blogTypeLabelMap[selectedBlogType];

    const filteredPosts = allPosts
        // .filter((post) => selectedPart === "전체" || post.part === selectedPart)
        .filter((post) => selectedBlogType === "all" || post.postType === selectedBlogType);

    return (
        <>
            <BlogTypeSelector selectedBlogType={selectedBlogType} />

            <div className="w-full max-w-full lg:max-w-[1100px] mx-auto py-[120px] px-6 lg:px-4 xl:px-0">
                <div className="flex flex-col lg:flex-row w-full items-end justify-start lg:justify-between gap-4 lg:gap-0 mb-[60px] lg:mb-[120px]">
                    <BlogPreviewSectionHeader selectedBlogTypeLabel={selectedBlogTypeLabel} />

                    {/* <PartSelector value={selectedPart} onChange={setSelectedPart} /> */}
                </div>

                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostPreviewItem
                            postId={post.postId}
                            postType={post.postType as PostTypes}
                            layout="horizontal_fill_large"
                            key={post.title}
                            part={post.part}
                            title={post.title}
                            description={post.description}
                            date={post.date}
                            authorName={post.authorName}
                            authorId={post.authorId}
                            postHref={`/archive/blog/${selectedBlogType}/${post.postId}`}
                        />
                    ))
                ) : (
                    <BlogPreviewListEmpty />
                )}
            </div>
        </>
    );
}
