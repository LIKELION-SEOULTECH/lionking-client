import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import ProfileSettingLoader from "./components/ProfileSettingLoader";
import { get_member_memberId } from "@/lib/api/endpoints/member";
import { get_authenticated_userid } from "@/lib/api/endpoints/auth";

export default async function ProfileSettingsPage() {
    const userId = await get_authenticated_userid();
    const memberDataPromise = get_member_memberId(userId);

    const Fallback = () => (
        <div className="flex items-center justify-center w-full h-full">
            <LoaderCircle className="size-4 text-white animate-spin" />
        </div>
    );

    return (
        <div className="overflow-hidden">
            <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 pt-30 pb-32">
                <div className="flex flex-col items-center justify-center w-full gap-30">
                    <div className="flex flex-col items-start justify-center w-full gap-4">
                        <h1 className="head3_sb text-white w-full">내 프로필 수정</h1>
                        <p className="body3_r text-gray-4">
                            기본 정보와 내 멤버 프로필 페이지를 수정하실 수 있습니다.
                        </p>
                    </div>

                    <Suspense fallback={<Fallback />}>
                        <ProfileSettingLoader
                            memberDataPromise={memberDataPromise}
                            memberId={userId}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
