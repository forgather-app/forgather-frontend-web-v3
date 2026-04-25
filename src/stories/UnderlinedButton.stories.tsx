import type { Meta, StoryObj } from "@storybook/react-vite";
import UnderlinedButton from "../components/@common/underlinedButton/UnderlinedButton";

const meta: Meta<typeof UnderlinedButton> = {
  title: "Common/UnderlinedButton",
  component: UnderlinedButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "밑줄(underline)이 있는 텍스트 버튼입니다.\n\n부가 액션이나 인라인 액션에 사용합니다.",
      },
    },
  },
  argTypes: {
    children: {
      control: { type: "text" },
      description: "버튼 라벨",
    },
  },
};

export default meta;

type Story = StoryObj<typeof UnderlinedButton>;

export const Default: Story = {
  args: {
    children: "button",
  },
};

export const LongLabel: Story = {
  args: {
    children: "더보기",
  },
};
