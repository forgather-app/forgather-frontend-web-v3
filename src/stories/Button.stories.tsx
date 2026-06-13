import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../components/@common/Button/Button";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "기본 버튼 컴포넌트입니다.\n\n4가지 변형(`primary`, `secondary`, `tertiary`, `underlined`)을 지원하며, `disabled` 속성으로 비활성 상태를 표현합니다.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "tertiary", "underlined"],
      description: "버튼 시각 변형",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부 (Figma `inactive` 상태)",
    },
    text: {
      control: { type: "text" },
      description: "버튼 텍스트",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    text: "BUTTON",
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    text: "BUTTON",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    text: "BUTTON",
  },
};

export const SecondaryDisabled: Story = {
  args: {
    variant: "secondary",
    disabled: true,
    text: "BUTTON",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    text: "BUTTON",
  },
};

export const TertiaryDisabled: Story = {
  args: {
    variant: "tertiary",
    disabled: true,
    text: "BUTTON",
  },
};

export const Underlined: Story = {
  args: {
    variant: "underlined",
    text: "BUTTON",
  },
};
