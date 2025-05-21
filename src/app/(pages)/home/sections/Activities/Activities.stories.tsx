import type { Meta, StoryObj } from "@storybook/react";
import Activities from "./Activities";

const meta: Meta<typeof Activities> = {
    title: "Home/Activities",
    component: Activities,
    // tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Activities>;

export const Default: Story = {
    render: () => (
        <div className="bg-gray-8">
            <Activities />
        </div>
    ),
};
