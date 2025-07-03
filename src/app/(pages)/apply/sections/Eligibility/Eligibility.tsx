export default function Eligibility() {
    const cards = [
        "매주 목요일 세션에\n참여가능한 분",
        "아이디어톤과 중앙해커톤에\n참여가능한 분",
        "다양한 협업 경험을\n쌓고싶은 분",
    ];

    return (
        <section className="relative w-full px-4 md:px-6">
            <div className="pt-[120px] flex flex-col items-center">
                <h2 className="head2_b text-white text-center">지원 자격 및 모집 대상</h2>

                <div className="mt-8 w-full max-w-[1060px] h-[82px] bg-gray-6 rounded-[10px] px-4 flex items-center justify-center">
                    <p className="body2_sb text-white text-center">
                        서울과학기술대학교 모든 학우 (재·휴학생)
                    </p>
                </div>

                <div className="mt-8 grid w-full max-w-[1060px] grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
                    {cards.map((text) => (
                        <div
                            key={text}
                            className="w-full md:h-[239px] bg-gray-2 rounded-[10px] md:rounded-[20px] px-6 py-10 flex items-center justify-center text-center"
                        >
                            <p className="body2_sb text-gray-8 whitespace-pre-line">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
