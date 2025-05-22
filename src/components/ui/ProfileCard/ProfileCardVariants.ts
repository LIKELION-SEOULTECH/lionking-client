import { cva } from "class-variance-authority";

export const ProfileCardVariants = cva(
    "relative flex flex-col items-center justify-center overflow-hidden rounded-[20px] cursor-pointer",
    {
        variants: {
            size: {
                default: "w-[334px] h-[454px] px-10 py-12 gap-6",
                small: "w-[241px] px-[26px] py-9 gap-[23px]",
                large: "w-[350px] px-[52px] py-[42px] gap-9",
            },
            transparency: {
                solid: "bg-gray-6 border-0",
                transparent: "bg-transparent border border-gray-5",
            },
        },
        defaultVariants: {
            size: "default",
            transparency: "solid",
        },
    }
);

export const ProfileCardImageVariants = cva(
    "relative flex items-center justify-center rounded-full overflow-hidden",
    {
        variants: {
            size: {
                default: "size-[254px]",
                small: "size-[188px]",
                large: "size-[246px]",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export const ProfileCardInfoGlobalLayoutVariants = cva("w-full flex items-center justify-center", {
    variants: {
        size: {
            default: "gap-4 flex-col",
            small: "gap-3 flex-col-reverse",
            large: "gap-4 flex-col-reverse",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

export const ProfileCardInfoTextLayoutVariants = cva("", {
    variants: {
        size: {
            large: "w-full flex flex-col items-center justify-center gap-3",
            small: "w-full flex flex-col items-center justify-center gap-1",
            default: "w-full flex items-end justify-center gap-2",
        },
    },
    defaultVariants: {
        size: "default",
    },
});
