import Image from "next/image";
import ShareIconBlack from "@/assets/icons/ic_upload_black.svg";
import { Member } from "@/types";

type DashboardProfileCardProps = {
    member: Member;
};

export default function DashboardProfileCard({ member }: DashboardProfileCardProps) {
    // 원래 프로필카드 variant로 해야할거같은데... 디자인도 따로고 그냥 귀찮아서 만듦 ㅎㅎㅎ;;

    return (
        <div className="w-full lg:max-w-[241px] h-fit lg:bg-gray-1 rounded-[20px] p-8">
            <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="relative flex items-center justify-center rounded-full overflow-hidden size-[177px]">
                    <Image src="/static/images/placeholder.png" alt="Profile Image" fill />
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center justify-center gap-2">
                            <p className="head4_b text-black">{member.name}</p>
                            <ShareIconBlack />
                        </div>

                        <p className="body3_r text-gray-6">{member.major}</p>
                    </div>

                    <div className="w-full flex items-center justify-center gap-2.5">
                        {member.userTags?.map((userTag, index) => (
                            <MembersGridItemTag key={index} userTag={userTag} />
                        ))}
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
