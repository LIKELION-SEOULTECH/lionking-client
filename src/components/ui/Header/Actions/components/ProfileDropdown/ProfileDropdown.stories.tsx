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
        name: "김사자",
        role: "13기 아기사자",
        onClicks: {
            myPage: () => {
                alert("My Page");
            },
            logout: () => {
                alert("Sign Out");
            },
        },
    },
};
