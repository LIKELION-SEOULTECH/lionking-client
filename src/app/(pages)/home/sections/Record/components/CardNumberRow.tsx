import CardNumber from "./CardNumber";

const CardNumberContent = [
    {
        num: 99,
        suffix: "년",
        decimals: 0,
        subheading: "운영기간",
    },
    {
        num: 99,
        suffix: "명",
        decimals: 0,
        subheading: "함께한 회원",
    },
    {
        num: 99,
        suffix: "+",
        decimals: 0,
        subheading: "프로젝트",
    },
];

export default function CardNumberRow() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[44px]">
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
