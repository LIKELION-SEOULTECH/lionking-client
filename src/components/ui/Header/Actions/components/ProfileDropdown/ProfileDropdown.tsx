import { cn } from "@/lib/utils";
import Image from "next/image";

type ProfileDropdownProps = {
    onClicks: {
        myPage: () => void;
        logout: () => void;
    };
    name: string;
    role: string;
    imageSrc?: string;
};

export default function ProfileDropdown({ name, role, imageSrc, onClicks }: ProfileDropdownProps) {
    return (
        <div className="flex flex-col items-center justify-center p-5 gap-[27px] w-full bg-gray-7 rounded-[8px]">
            <div className="w-full flex items-center justify-start gap-4">
                <div className="relative size-12 rounded-full overflow-hidden">
                    <Image
                        src={imageSrc ?? "/static/images/placeholder.png"}
                        alt={`Profile image of ${name}`}
                        objectFit="cover"
                        fill
                    />
                </div>

                <div className="h-full flex flex-col items-start justify-start gap-[5px] text-white">
                    <p className="sub3_sb">{name}</p>
                    <p className="body6_r">{role}</p>
                </div>
            </div>

            <div className="w-full flex items-center justify-center gap-[3px]">
                <ProfileDropdownActionButton
                    label="마이페이지"
                    position="LEFT"
                    onClick={onClicks.myPage}
                />
                <ProfileDropdownActionButton
                    label="로그아웃"
                    position="RIGHT"
                    onClick={onClicks.logout}
                />
            </div>
        </div>
    );
}

type ProfileDropdownActionButtonProps = {
    onClick?: () => void;
    position: "LEFT" | "RIGHT";
    label: string;
};

function ProfileDropdownActionButton({
    label,
    position,
    onClick,
}: ProfileDropdownActionButtonProps) {
    return (
        <button
            className={cn(
                "w-full flex items-center justify-start bg-gray-5 hover:bg-gray-5/70 px-6 py-2.5 body6_r text-orange-main text-center cursor-pointer transition-colors duration-200",
                position === "LEFT" ? "rounded-l-[8px]" : "rounded-r-[8px]"
            )}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
