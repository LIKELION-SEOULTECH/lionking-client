import { News } from "@/types";
import ActivityCard from "./components/ActivityCard";

export default function ActivitiesSection({ items }: { items: News[] }) {
    return (
        <div className="w-full max-w-[1100px] mx-auto">
            <h2 className="head3_sb text-white mb-18">멋사의 최근 활동 톺아보기</h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {items.map((news) => (
                    <ActivityCard key={news.id} {...news} />
                ))}
            </div>
        </div>
    );
}
