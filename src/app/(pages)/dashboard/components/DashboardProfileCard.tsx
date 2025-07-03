import Image from "next/image";
import ShareIconBlack from "@/assets/icons/ic_upload_black.svg";
import { Member, positionEnumToLabel, roleEnumToLabel } from "@/types";

type DashboardProfileCardProps = {
    member: Member;
};

export default function DashboardProfileCard({ member }: DashboardProfileCardProps) {
    return (
        <div className="w-full lg:max-w-[241px] h-fit lg:bg-gray-1 rounded-[20px] p-8">
            <div className="flex flex-col items-center justify-center w-full gap-4">
                <div className="relative flex items-center justify-center rounded-full overflow-hidden size-[177px]">
                    <Image src="/static/images/default_profile.png" alt="Profile Image" fill />
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-black head4_b">{member.name}</p>
                        </div>

                        <p className="body3_r text-gray-6">{member.major}</p>
                    </div>

                    <div className="w-full flex items-center justify-center gap-2.5">
                        {/* {member.userTags?.map((userTag, index) => (
                            <MembersGridItemTag key={index} userTag={userTag} />
                        ))} */}
                        {member.position && (
                            <MembersGridItemTag userTag={positionEnumToLabel[member.position]} />
                        )}

                        {member.role && (
                            <MembersGridItemTag userTag={roleEnumToLabel[member.role]} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MembersGridItemTag({ userTag }: { userTag: string }) {
    return (
        <div className="flex items-center justify-center px-2.5 py-1.5 border border-orange-main text-orange-main rounded-[8px] sub4_sb">
            {userTag}
        </div>
    );
}
