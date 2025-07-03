type Field = {
    title: string;
    subtitle: string;
    description: string;
};

const fields: Field[] = [
    {
        title: "PLAN",
        subtitle: "Product manager / Product owner",
        description:
            "서비스의 아이디어를 구체화하고, 어떤 기능이 필요한지 고민하며 팀원들과 협업해 프로젝트를 이끌어가는 역할을 해요.",
    },
    {
        title: "DESIGN",
        subtitle: "Product designer",
        description:
            "프로젝트에서 사용자들이 편리하게 이용할 수 있도록 UX/UI 디자인을 만들고, 서비스의 비주얼 아이덴티티를 구축하는 역할을 해요.",
    },
    {
        title: "FRONTEND",
        subtitle: "Frontend developer",
        description:
            "웹이나 앱에서 사용자가 직접 보는 화면을 개발하고, 디자인을 실제로 구현하는 역할을 해요.",
    },
    {
        title: "BACKEND",
        subtitle: "Backend developer",
        description:
            "데이터베이스와 서버를 개발하고, 서비스가 원활하게 작동할 수 있도록 보이지 않는 곳에서 핵심 기능을 담당해요.",
    },
    {
        title: "AI",
        subtitle: "AI developer",
        description:
            "인공지능 기술을 활용해 데이터를 분석하고, 더 스마트한 기능을 개발해 서비스에 적용하는 역할을 해요.",
    },
];

export default function Fields() {
    return (
        <section className="relative w-full px-4 md:px-6">
            <div className="pt-[120px] flex flex-col items-center">
                <h2 className="head2_b text-white text-[32px] text-center">모집 분야</h2>

                <div className="mt-[60px] w-full max-w-[1060px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fields.map((field) => (
                        <div
                            key={field.title}
                            className="group relative w-full h-[240px] md:h-[310px] rounded-[20px] overflow-hidden bg-white/10 transition-all duration-300 hover:bg-transparent border-[1px] border-transparent border-solid group-hover:[border-image:linear-gradient(135deg,#FFF0E4,#753200)_1]"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-[20px] bg-gradient-to-br from-[#A14C09] to-[#592B09] transition-opacity duration-300" />
                            <div className="relative z-10 flex flex-col h-full px-[27px] py-[29px] rounded-[20px]">
                                <h3 className="head3_sb text-white text-[32px]">{field.title}</h3>
                                <p className="body5_r text-white/70 text-[16px] mt-[6px]">
                                    {field.subtitle}
                                </p>
                                <p className="body4_m text-white/70 text-[16px] mt-auto whitespace-pre-line group-hover:text-white">
                                    {field.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
