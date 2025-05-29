import type { Meta, StoryObj } from "@storybook/react";
import TypeLogo from "./TypeLogo";

const meta: Meta<typeof TypeError> = {
    title: "ST TypeLogo",
    component: TypeLogo,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TypeLogo>;

export const Default: Story = {};
