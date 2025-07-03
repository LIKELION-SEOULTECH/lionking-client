import type { Member } from "@/types";

export type ProfileDropdownProps = {
    onClicks: {
        signout: () => void;
    };
    member: Member;
};

export type ProfileDropdownActionButtonProps = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
};
