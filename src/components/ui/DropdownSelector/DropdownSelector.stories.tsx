import type { Meta, StoryObj } from "@storybook/react";
import DropdownSelector from "./DropdownSelector";

type OptionType = "전체" | "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";

const options: OptionType[] = ["전체", "기획", "디자인", "프론트엔드", "백엔드", "AI"];

const meta: Meta<typeof DropdownSelector<OptionType>> = {
    title: "Components/DropdownSelector",
    component: DropdownSelector,
    tags: ["autodocs"],
    argTypes: {
        dark: {
            control: "boolean",
        },
    },
    args: {
        value: "전체",
        options,
        dark: false,
    },
};

export default meta;

type Story = StoryObj<typeof DropdownSelector<OptionType>>;

export const LightMode: Story = {
    render: (args) => (
        <div className="bg-white p-10 min-h-screen">
            <DropdownSelector
                {...args}
                onChange={(val) => {
                    alert(val);
                }}
            />
        </div>
    ),
};

export const DarkMode: Story = {
    args: {
        dark: true,
    },
    render: (args) => (
        <div className="bg-gray-8 p-10 min-h-screen">
            <DropdownSelector
                {...args}
                onChange={(val) => {
                    alert(val);
                }}
            />
        </div>
    ),
};
