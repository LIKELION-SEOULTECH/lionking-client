import ActivityCard from "./ActivityCard";
import type { ActivityCardProps } from "./ActivityCard";

export default function ActivityGrid({ items }: { items: ActivityCardProps[] }) {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-8">
            <div className="w-[1060px] mx-auto grid grid-cols-2 gap-x-6 gap-y-[30px]">
                {items.slice(0, 4).map((item, i) => (
                    <div key={i} className="h-[390px]">
                        <ActivityCard
                            title={item.title}
                            description={item.description}
                            backgroundImage={item.backgroundImage}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
