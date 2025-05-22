import type { Meta, StoryObj } from "@storybook/react";
import ProfileCard from "./ProfileCard";
import { ProfileCardProps } from "./types";

const meta: Meta<typeof ProfileCard> = {
    title: "Components/ProfileCard",
    component: ProfileCard,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

const Template: Story = {
    render: (args: ProfileCardProps) => <ProfileCard {...args} />,
};

export const Default: Story = {
    ...Template,
    args: {
        name: "김사자",
        major: "인공지능학과",
        userTags: ["프론트엔드", "아기사자"],
    },
};

export const SmallTransparent: Story = {
    ...Template,
    args: {
        name: "김사자",
        major: "인공지능학과",
        userTags: ["프론트엔드", "아기사자"],
        size: "small",
        transparency: "transparent",
    },
};

export const LargeTransparent: Story = {
    ...Template,
    args: {
        name: "김사자",
        major: "인공지능학과",
        userTags: ["프론트엔드", "아기사자"],
        size: "large",
        transparency: "transparent",
    },
};
