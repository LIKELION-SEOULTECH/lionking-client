import type { Meta, StoryObj } from "@storybook/react";
import Projects from "./Projects";

const meta: Meta<typeof Projects> = {
    title: "Home/Projects",
    component: Projects,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Projects>;

export const Default: Story = {
    render: () => (
        <div className="bg-gray-8">
            <Projects />
        </div>
    ),
};
