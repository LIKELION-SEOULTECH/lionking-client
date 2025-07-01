import PostPreviewItem from "@/components/ui/PostPreviewItem";

export default function BlogSuggestion({ currentBlogId }: { currentBlogId: number | string }) {
    console.log(currentBlogId);

    return (
        <div className="flex flex-col items-start justify-start w-full gap-10">
            <h2 className="text-black head3_sb">이 글은 어떠세요?</h2>

            <PostPreviewItem
                postId={2}
                postType="session"
                layout="horizontal_fill_small"
                part="FRONTEND"
                title="피그마 필수 기능 1시간 만에 정복하기"
                description="UI/UX 디자인을 하기 위해 필요한 피그마 필수 기능을 담은 피그마 소개서를 공유합니다."
                date="2025.04.18"
                authorId={1}
                authorName="김사자"
            />

            <div className="h-[1px] w-full bg-gray-3" />

            <PostPreviewItem
                postId={3}
                postType="session"
                layout="horizontal_fill_small"
                part="FRONTEND"
                title="피그마 필수 기능 1시간 만에 정복하기"
                description="UI/UX 디자인을 하기 위해 필요한 피그마 필수 기능을 담은 피그마 소개서를 공유합니다."
                date="2025.04.18"
                authorId={1}
                authorName="김사자"
            />
        </div>
    );
}
