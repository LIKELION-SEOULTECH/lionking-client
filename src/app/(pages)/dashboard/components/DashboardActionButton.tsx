import ChevronRightOrangeSVG from "@/assets/icons/chevron-right-orange.svg";

type DashboardActionButtonProps = {
    label: string;
    onClick?: () => void;
};

export default function DashboardActionButton({ label, onClick }: DashboardActionButtonProps) {
    return (
        <button
            className="w-full lg:max-w-[241px] flex items-center justify-between px-6.25 py-3 bg-orange-light-1 rounded-full text-orange-main sub2_sb hover:bg-orange-light-2/80 transition-colors duration-200 cursor-pointer"
            onClick={onClick}
        >
            {label}
            <ChevronRightOrangeSVG />
        </button>
    );
}
