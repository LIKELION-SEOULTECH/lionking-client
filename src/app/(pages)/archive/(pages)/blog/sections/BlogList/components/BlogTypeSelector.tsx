import { cn } from "@/lib/utils";
import { BlogTypeFilters } from "@/types";

type BlogTypeSelectorProps = {
    selectedBlogType: BlogTypeFilters;
    onChange: (part: BlogTypeFilters) => void;
};

const blogTypeFilters: BlogTypeFilters[] = ["세션", "블로그"];

export default function BlogTypeSelector({ selectedBlogType, onChange }: BlogTypeSelectorProps) {
    return (
        <div className="w-full flex items-center justify-center py-4 bg-orange-light-1">
            <div className="flex items-center justify-center gap-[60px] sub2_sb">
                {blogTypeFilters.map((filter) => (
                    <button
                        key={filter}
                        className={cn(
                            selectedBlogType === filter
                                ? "text-orange-main hover:text-orange-main/80"
                                : "text-gray-7 hover:text-gray-7/80",
                            "cursor-pointer transition-colors duration-200"
                        )}
                        onClick={() => onChange(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
}
