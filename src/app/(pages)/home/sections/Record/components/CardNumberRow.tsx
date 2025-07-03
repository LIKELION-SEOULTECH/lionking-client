import CardNumber from "./CardNumber";

const CardNumberContent = [
    {
        num: 2022,
        suffix: "",
        decimals: 0,
        subheading: "Since",
    },
    {
        num: 55,
        suffix: "명",
        decimals: 0,
        subheading: "함께한 회원",
    },
    {
        num: 30,
        suffix: "+",
        decimals: 0,
        subheading: "프로젝트",
    },
];

export default function CardNumberRow() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-[repeat(3,294px)] justify-center gap-4 md:gap-8 px-6">
            {CardNumberContent.map((item, index) => (
                <CardNumber
                    key={index}
                    num={item.num}
                    suffix={item.suffix}
                    decimals={item.decimals}
                    subheading={item.subheading}
                />
            ))}
        </div>
    );
}
