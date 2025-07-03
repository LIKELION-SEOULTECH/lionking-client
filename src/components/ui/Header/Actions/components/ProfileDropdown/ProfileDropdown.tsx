import Image from "next/image";
import type { ProfileDropdownProps } from "@/components/ui/Header/types";
import { ProfileDropdownActionButtonGroup } from "./ProfileDropdownActionButton";
import { profileDropdownActionMap } from "./profileDropdownActionMap";

export default function ProfileDropdown({ member, onClicks }: ProfileDropdownProps) {
    const buttonGroups = profileDropdownActionMap[member.role](onClicks);

    return (
        <div className="flex flex-col items-center justify-center px-5 py-6 gap-4.5 w-full bg-gray-7 rounded-[12px] divide-y divide-gray-5">
            <div className="w-full flex items-center justify-start gap-4 pb-4.5">
                <div className="relative size-13 rounded-full overflow-hidden">
                    <Image
                        src={member.imageUrl ?? "/static/images/placeholder_profile.svg"}
                        alt={`${member.name}의 프로필 이미지`}
                        objectFit="cover"
                        fill
                    />
                </div>

                <div className="h-full flex flex-col items-start justify-center gap-1.25 text-white">
                    <p className="sub3_sb">{member.name}</p>
                    <p className="body6_r">{member.roleLabel}</p>
                </div>
            </div>

            <ProfileDropdownActionButtonGroup buttonGroups={buttonGroups} />
        </div>
    );
}
