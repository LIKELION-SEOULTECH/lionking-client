import type { Meta, StoryObj } from "@storybook/react";
import ProjectCardStatic from "./ProjectCardStatic";

const meta: Meta<typeof ProjectCardStatic> = {
    title: "Archive/Projects/ProjectCardStatic",
    component: ProjectCardStatic,
};

export default meta;

type Story = StoryObj<typeof ProjectCardStatic>;

export const Default: Story = {};
