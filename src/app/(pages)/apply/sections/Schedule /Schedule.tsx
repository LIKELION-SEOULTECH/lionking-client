export default function Schedule() {
    const headers = ["서류 접수", "서류 결과", "면접 진행", "최종 합격", "OT"];
    const values = ["2.21-3.5", "3.9", "3.11-3.13", "3.15", "4.1"];

    return (
        <section className="relative w-full px-4 md:px-6">
            <div className="pt-[120px] flex flex-col items-center">
                <h2 className="head2_b text-white text-center">모집 일정</h2>

                <div className="mt-[60px] w-full max-w-[1060px] rounded-lg overflow-x-auto">
                    <div className="min-w-[600px]">
                        <div className="grid grid-cols-5 gap-x-4 md:gap-x-[123px] bg-gray-6 text-white py-4 px-6 md:px-[50px] sub1_sb">
                            {headers.map((label) => (
                                <div key={label} className="text-center text-sm lg:text-base">
                                    {label}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-5 gap-x-4 md:gap-x-[123px] bg-gray-2 text-gray-900 py-8 px-6 md:px-[43px] sub1_sb">
                            {values.map((value, i) => (
                                <div key={i} className="text-center text-sm lg:text-base">
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
