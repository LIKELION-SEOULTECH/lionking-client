import ActivityCard from "./ActivityCard";
import type { ActivityCardProps } from "./ActivityCard";

export default function ActivityGrid({ items }: { items: ActivityCardProps[] }) {
    return (
        <div className="w-full flex justify-center">
            <div className="grid w-full max-w-[1200px] grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 px-4 sm:px-8">
                {items.map((item, i) => (
                    <ActivityCard
                        key={i}
                        title={item.title}
                        description={item.description}
                        backgroundImage={item.backgroundImage}
                    />
                ))}
            </div>
        </div>
    );
}
