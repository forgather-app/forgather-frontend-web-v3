import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Toggle from "../../../components/@common/toggle/Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Common/Toggle",
  component: Toggle,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1B1D1F" }],
    },
  },
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

const ControlledToggle = (args: React.ComponentProps<typeof Toggle>) => {
  const [checked, setChecked] = useState(args.checked);
  return <Toggle {...args} checked={checked} onChange={setChecked} />;
};

export const On: Story = {
  render: (args) => <ControlledToggle {...args} />,
  args: {
    checked: true,
    onLabel: "전체 공개",
    offLabel: "나만보기",
    showLabel: true,
  },
};

export const Off: Story = {
  render: (args) => <ControlledToggle {...args} />,
  args: {
    checked: false,
    onLabel: "전체 공개",
    offLabel: "나만보기",
    showLabel: true,
  },
};

export const WithoutLabel: Story = {
  render: (args) => <ControlledToggle {...args} />,
  args: {
    checked: true,
    showLabel: false,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    onLabel: "전체 공개",
    offLabel: "나만보기",
    showLabel: true,
  },
};

export const DisabledOn: Story = {
  args: {
    checked: true,
    disabled: true,
    onLabel: "전체 공개",
    offLabel: "나만보기",
    showLabel: true,
  },
};
