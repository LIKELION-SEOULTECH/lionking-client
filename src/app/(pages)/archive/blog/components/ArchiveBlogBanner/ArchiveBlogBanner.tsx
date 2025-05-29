import Icons from "@/assets/banner/archive/blog/icons.svg";

export default function ArchiveBanner() {
    return (
        <div className="pt-[62px] w-screen h-[352px] overflow-hidden relative flex items-center justify-center bg-gray-1">
            <div className="relative flex items-center justify-start w-full max-w-[1100px] h-full px-6">
                <Icons className="absolute right-0 bottom-0 z-0 pointer-events-none" />

                <p className="z-10 head3_sb text-gray-8">
                    멋쟁이사자처럼 회원들의 <br />
                    <span className="text-orange-main">도전, 기록, 노하우</span>를 전합니다
                </p>
            </div>
        </div>
    );
}
