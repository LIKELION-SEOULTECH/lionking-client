import NotFoundSVG from "@/assets/icons/not_found.svg";

export default function NotFound() {
    return (
        <div className="w-full h-[90vh] bg-white flex items-center justify-center pt-16">
            <div className="flex flex-col items-center justify-center gap-6">
                <NotFoundSVG />

                <h1 className="sub1_sb text-gray-5 text-center">페이지를 찾을 수 없어요</h1>
                <p className="body4_m text-gray-4 text-center">
                    페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
                    <br /> 입력하신 주소가 정확한지 다시 한 번 확인해주세요.
                </p>
            </div>
        </div>
    );
}
