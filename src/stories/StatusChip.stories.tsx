import type { Meta, StoryObj } from "@storybook/react-vite";
import StatusChip from "../components/@common/Chip/DisplayChip/StatusChip/StatusChip";

const meta: Meta<typeof StatusChip> = {
  title: "UI/StatusChip",
  component: StatusChip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "전시 진행 상태를 나타내는 칩 컴포넌트입니다.\n\n`variant`로 시각적 표현을 결정합니다: `active`(보라), `inactive`(회색), `info`(빨간).",
      },
    },
  },
  argTypes: {
    status: {
      control: { type: "radio" },
      options: ["inProgress", "ended", "+2"],
      description: "라벨 텍스트용 상태",
    },
    variant: {
      control: { type: "radio" },
      options: ["active", "inactive", "info", "dimmed"],
      description: "칩의 시각적 표현 방식",
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatusChip>;

export const Active: Story = {
  args: { status: "inProgress", variant: "active" },
};

export const Inactive: Story = {
  args: { status: "ended", variant: "inactive" },
};
