import type { Meta, StoryObj } from "@storybook/react";
import ProfileDropdown from "./ProfileDropdown";

const meta: Meta<typeof ProfileDropdown> = {
    title: "Header/ProfileDropdown",
    component: ProfileDropdown,
    // tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProfileDropdown>;

export const Default: Story = {
    args: {
        member: {
            id: 1,
            name: "김먀옹",
            major: "인공지능학과",
            position: "FRONTEND",
            positionLabel: "프론트엔드",
            role: "MANAGER",
            roleLabel: "운영진",
            userTags: ["프론트엔드", "운영진"],
        },
        onClicks: {
            signout: () => {
                alert("Sign Out");
            },
        },
    },
};
