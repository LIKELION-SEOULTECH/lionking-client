import { cn } from "@/lib/utils";
import { BlogTypeFilters } from "@/types";
import Link from "next/link";

type BlogTypeSelectorProps = {
    selectedBlogType: BlogTypeFilters;
};

export default function BlogTypeSelector({ selectedBlogType }: BlogTypeSelectorProps) {
    return (
        <div className="w-full flex items-center justify-center py-4 bg-orange-light-1">
            <div className="flex items-center justify-center gap-[60px] sub2_sb">
                <Link
                    href="/archive/blog/session"
                    className={cn(
                        selectedBlogType === "session"
                            ? "text-orange-main hover:text-orange-main/80"
                            : "text-gray-7 hover:text-gray-7/80",
                        "cursor-pointer transition-colors duration-200"
                    )}
                >
                    세션
                </Link>

                <Link
                    href="/archive/blog/article"
                    className={cn(
                        selectedBlogType === "article"
                            ? "text-orange-main hover:text-orange-main/80"
                            : "text-gray-7 hover:text-gray-7/80",
                        "cursor-pointer transition-colors duration-200"
                    )}
                >
                    아티클
                </Link>
            </div>
        </div>
    );
}
