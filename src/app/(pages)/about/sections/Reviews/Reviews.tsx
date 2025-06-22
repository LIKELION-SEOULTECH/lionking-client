import Section from "@/components/ui/Section";
import { ReviewCardProps } from "./components/ReviewCard";
import ReviewCardList from "./components/ReviewCardList";

const mockReviews: ReviewCardProps[] = Array.from({ length: 7 }, () => ({
    authorName: "김땡땡",
    authorBio: "99기 기획",
    content:
        "IT에 대한 배경지식이 많이 부족한 상태로 왔었지만, 정말 후회없고 행복한 시간이었어요. 모르는 것에 대해 부끄러워하는 것이 아닌 함께 알려주고 성장하는 문화",
}));

export default function Reviews() {
    return (
        <Section
            displayName="Reviews"
            displayTitle="나에게 멋사란?"
            theme="LIGHT"
            className="py-50"
        >
            <div className="flex flex-col items-center justify-center">
                <ReviewCardList items={mockReviews} />
            </div>
        </Section>
    );
}
