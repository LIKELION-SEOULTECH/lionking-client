import { cn } from "@/lib/utils";
import { RoleFilters } from "@/types";

type RoleSelectorProps = {
    selectedRole: RoleFilters;
    onChange: (part: RoleFilters) => void;
};

const roleFilters: RoleFilters[] = ["전체", "운영진", "아기사자"];

export default function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
    return (
        <div className="w-full flex items-center justify-center py-4 bg-gray-6">
            <div className="flex items-center justify-center gap-[60px] sub2_sb">
                {roleFilters.map((filter) => (
                    <button
                        key={filter}
                        className={cn(
                            selectedRole === filter
                                ? "text-orange-main hover:text-orange-main/80"
                                : "text-gray-1 hover:text-gray-3",
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
