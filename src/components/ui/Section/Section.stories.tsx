import type { Meta, StoryObj } from "@storybook/react";
import Section from "./Section";

const meta: Meta<typeof Section> = {
    title: "Section",
    component: Section,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
    args: {
        displayName: "Section Name",
        displayTitle: "Section Title",
        displayDescription: "Section Description",
        theme: "LIGHT",
        children: <div>Content goes here</div>,
    },
};
