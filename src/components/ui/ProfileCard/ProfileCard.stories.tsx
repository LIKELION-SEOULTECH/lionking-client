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
        member: {
            id: 1,
            name: "김사자",
            major: "인공지능학과",
            position: "FRONTEND",
            userTags: ["프론트엔드", "아기사자"],
            profileIntro: "안녕하시렵니까",
            profileIntroTags: ["위엄", "라잌어", "라이옹"],
            profileIntroSkills: ["잠자기", "공부하기"],
            profileExternalLinks: [
                { label: "GitHub", url: "https://github.com" },
                { label: "Portfolio", url: "https://portfolio.com" },
            ],
            imageUrl: "/static/images/placeholder.png",
            role: "MEMBER",
            roleLabel: "아기사자",
        },
    },
};

export const SmallTransparent: Story = {
    ...Template,
    args: {
        member: {
            id: 1,
            name: "김사자",
            major: "인공지능학과",
            position: "FRONTEND",
            userTags: ["프론트엔드", "아기사자"],
            profileIntro: "안녕하시렵니까",
            profileIntroTags: ["위엄", "라잌어", "라이옹"],
            profileIntroSkills: ["잠자기", "공부하기"],
            profileExternalLinks: [
                { label: "GitHub", url: "https://github.com" },
                { label: "Portfolio", url: "https://portfolio.com" },
            ],
            imageUrl: "/static/images/placeholder.png",
            role: "MEMBER",
            roleLabel: "아기사자",
        },
        size: "small",
        transparency: "transparent",
    },
};

export const LargeTransparent: Story = {
    ...Template,
    args: {
        member: {
            id: 1,
            name: "김사자",
            major: "인공지능학과",
            position: "FRONTEND",
            userTags: ["프론트엔드", "아기사자"],
            profileIntro: "안녕하시렵니까",
            profileIntroTags: ["위엄", "라잌어", "라이옹"],
            profileIntroSkills: ["잠자기", "공부하기"],
            profileExternalLinks: [
                { label: "GitHub", url: "https://github.com" },
                { label: "Portfolio", url: "https://portfolio.com" },
            ],
            imageUrl: "/static/images/placeholder.png",
            role: "MEMBER",
            roleLabel: "아기사자",
        },
        size: "large",
        transparency: "transparent",
    },
};
