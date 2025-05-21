import type { Meta, StoryObj } from "@storybook/react";
import ProjectCard from "./ProjectCard";

const meta: Meta<typeof ProjectCard> = {
    title: "Home/Projects/ProjectCard",
    component: ProjectCard,
    // tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {};
