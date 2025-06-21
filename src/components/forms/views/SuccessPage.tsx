import SuccessCheckSVG from "@/assets/img_check_success.svg";
import ArrowRightSVG from "@/assets/ic_arrow_right_white.svg";
import Link from "next/link";

type SuccessPageProps = {
    title?: string;
    buttonLabel?: string;
    href?: string;
};

export default function SuccessPage({ title, buttonLabel, href }: SuccessPageProps) {
    return (
        <div className="w-full h-[90vh] bg-white flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex flex-col items-center justify-center gap-3">
                    <SuccessCheckSVG />
                    <h1 className="body1_sb text-gray-8">{title || "완료되었습니다."}</h1>
                </div>

                <Link href={href || "/"}>
                    <button className="flex items-center justify-center gap-1 px-5 py-3 bg-gray-5 text-white rounded-full cursor-pointer">
                        <span>{buttonLabel || "홈으로 돌아가기"}</span>
                        <ArrowRightSVG />
                    </button>
                </Link>
            </div>
        </div>
    );
}
