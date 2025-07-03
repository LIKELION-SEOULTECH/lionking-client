import type { Meta, StoryObj } from "@storybook/react";
import PostPreviewItem from "./PostPreviewItem";
import { PostPreviewMetadata } from "@/types";

const meta: Meta<typeof PostPreviewItem> = {
    title: "Components/PostPreviewItem",
    component: PostPreviewItem,
    tags: ["autodocs"],
    argTypes: {
        layout: {
            control: "select",
            options: [
                "horizontal_fill_large",
                "horizontal_fill_small",
                "horizontal_compact",
                "vertical_large",
                "vertical_small",
                "vertical_compact",
            ],
        },
    },
};

export default meta;

type Story = StoryObj<typeof PostPreviewItem>;

const baseArgs: PostPreviewMetadata = {
    part: "FRONTEND",
    postId: "1",
    postType: "session",
    title: "피그마 필수 기능 1시간 만에 정복하기",
    description:
        "UI/UX 디자인을 하기 위해 필요한 피그마 필수 기능을 담은 피그마 소개서를 공유합니다.",
    date: "2025.04.18",
    authorName: "김사자",
    authorId: "1",
};

export const HorizontalFillLarge: Story = {
    args: {
        ...baseArgs,
        layout: "horizontal_fill_large",
    },
};

export const HorizontalFillSmall: Story = {
    args: {
        ...baseArgs,
        layout: "horizontal_fill_small",
    },
};

export const HorizontalCompact: Story = {
    args: {
        ...baseArgs,
        layout: "horizontal_compact",
    },
};

export const VerticalLarge: Story = {
    args: {
        ...baseArgs,
        layout: "vertical_large",
    },
};

export const VerticalSmall: Story = {
    args: {
        ...baseArgs,
        layout: "vertical_small",
    },
};

export const VerticalCompact: Story = {
    args: {
        ...baseArgs,
        layout: "vertical_compact",
    },
};
