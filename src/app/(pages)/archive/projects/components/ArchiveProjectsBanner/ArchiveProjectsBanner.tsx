import Icons from "@/assets/banner/archive/projects/icons.svg";

export default function ArchiveProjectsBanner() {
    return (
        <div className="pt-[62px] w-screen h-[352px] overflow-hidden relative flex items-center justify-center bg-gray-1">
            <div className="relative flex items-center justify-start w-full max-w-[1100px] h-full px-6">
                <Icons className="absolute right-0 z-0 pointer-events-none" />

                <p className="z-10 head3_sb text-gray-8">
                    멋쟁이사자처럼에서 탄생한 <br />
                    다양한 <span className="text-orange-main">프로젝트</span>를 소개합니다
                </p>
            </div>
        </div>
    );
}
