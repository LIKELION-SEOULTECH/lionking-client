"use client";

export default function Schedule() {
    // TODO: 실제 데이터로 교체
    const headers = ["서류 접수", "서류 결과", "면접 진행", "최종 합격", "OT"];
    const values = ["2.21-3.5", "3.9", "3.11-3.13", "3.15", "4.1"];

    return (
        <section className="relative w-full py-30">
            <div className="flex flex-col items-center gap-18">
                <h2 className="head2_b text-white">모집 일정</h2>

                <div className="mt-[60px] w-[1060px] rounded-lg overflow-hidden flex flex-col">
                    <div className="grid grid-cols-5 gap-x-[123px] bg-gray-6 text-white py-[16px] px-[50px] sub1_sb">
                        {headers.map((label) => (
                            <div key={label} className="text-center">
                                {label}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-5 gap-x-[123px] bg-gray-2 text-gray-900 py-[48px] px-[43px] sub1_sb">
                        {values.map((value, i) => (
                            <div key={i} className="text-center">
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
