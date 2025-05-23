import { cva } from "class-variance-authority";

export type PostPreviewLayout =
    | "horizontal_fill_large"
    | "horizontal_fill_small"
    | "horizontal_compact"
    | "vertical_large"
    | "vertical_small"
    | "vertical_compact";

export const previewItemVariants = cva("w-full", {
    variants: {
        layout: {
            horizontal_fill_large: "flex justify-between items-center flex-row-reverse py-9",
            horizontal_fill_small: "flex justify-between items-center flex-row-reverse",
            horizontal_compact: "flex justify-start items-center gap-4",

            vertical_large: "flex flex-col items-start justify-center w-[497px] gap-4",
            vertical_small: "flex flex-col items-start justify-center w-[332px] gap-4",
            vertical_compact: "flex flex-col items-start justify-center w-[332px] gap-4",
        },
    },
});

export const styleMap: Record<
    PostPreviewLayout,
    {
        part: string;
        title: string;
        desc: string;
        meta: string;
        partPosition?: "TOP" | "BOTTOM" | "NONE";
    }
> = {
    horizontal_fill_large: {
        part: "body3_m text-orange-main",
        title: "head5_sb text-gray-8",
        desc: "body3_r text-gray-5",
        meta: "body5_r text-gray-4",
        partPosition: "TOP",
    },
    horizontal_fill_small: {
        part: "sub4_sb text-orange-main",
        title: "sub1_sb text-gray-8",
        desc: "body4_m text-gray-5",
        meta: "body5_r text-gray-4",
        partPosition: "TOP",
    },
    horizontal_compact: {
        part: "body6_r text-orange-main",
        title: "sub2_sb text-gray-8",
        desc: "body4_m text-gray-5",
        meta: "body6_r text-gray-4",
        partPosition: "BOTTOM",
    },
    vertical_large: {
        part: "caption6_m text-orange-main",
        title: "sub1_sb text-gray-8",
        desc: "body3_m text-gray-5",
        meta: "caption6_m text-gray-4",
        partPosition: "BOTTOM",
    },
    vertical_small: {
        part: "body6_r text-orange-main",
        title: "sub2_sb text-gray-8",
        desc: "body4_m text-gray-5",
        meta: "body6_r text-gray-4",
        partPosition: "BOTTOM",
    },
    vertical_compact: {
        part: "",
        title: "sub2_sb text-gray-8",
        desc: "body4_m text-gray-5",
        meta: "caption7_m text-gray-4",
        partPosition: "NONE",
    },
};
