import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ProfileDropdownActionButtonProps } from "@/components/ui/Header/types";

export function ProfileDropdownActionButtonGroup({
    buttonGroups,
}: {
    buttonGroups: ProfileDropdownActionButtonProps[][];
}) {
    return (
        <div className="w-full flex flex-col items-start justify-center gap-4.5">
            {buttonGroups.map((group, groupIndex) => (
                <div
                    key={groupIndex}
                    className="w-full flex flex-col items-start justify-start gap-4.5"
                >
                    {group.map((button, index) => (
                        <ProfileDropdownActionButton key={index} {...button} />
                    ))}
                    {groupIndex < buttonGroups.length - 1 && (
                        <div className="w-full h-[1px] bg-gray-5" />
                    )}
                </div>
            ))}
        </div>
    );
}

export function ProfileDropdownActionButton({
    label,
    icon,
    onClick,
    href,
    className,
}: ProfileDropdownActionButtonProps) {
    const style = cn(
        "w-full flex items-center justify-start gap-2 body6_r text-white hover:text-orange-main cursor-pointer transition-colors duration-200",
        className
    );

    if (href) {
        return (
            <Link href={href} className={style}>
                <div>{icon}</div>
                <span>{label}</span>
            </Link>
        );
    }

    return (
        <button className={style} onClick={onClick}>
            <div>{icon}</div>
            <span>{label}</span>
        </button>
    );
}
