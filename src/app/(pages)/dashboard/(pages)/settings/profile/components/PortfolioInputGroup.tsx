import { ProfileSettingForm as F } from "./ProfileSettingForm";

const portfolioOptions = [
    { label: "GitHub", value: "github" },
    { label: "Notion", value: "notion" },
    { label: "Behance", value: "behance" },
    { label: "Blog", value: "blog" },
    { label: "Instagram", value: "instagram" },
    { label: "기타", value: "etc" },
];

export function PortfolioInputGroup({
    index,
    onRemove,
    showRemove,
}: {
    index: number;
    onRemove?: () => void;
    showRemove?: boolean;
}) {
    return (
        <div className="flex items-center gap-4 w-full">
            <F.Select name={`portfolios[${index}].type`} options={portfolioOptions} />
            <F.Input
                name={`portfolios[${index}].url`}
                placeholder="포트폴리오 URL을 입력해주세요"
                className="flex-1"
            />
            {showRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-sm text-red-500 px-2 hover:underline cursor-pointer"
                >
                    삭제
                </button>
            )}
        </div>
    );
}
