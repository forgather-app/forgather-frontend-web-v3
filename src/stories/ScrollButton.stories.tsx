import type { Meta, StoryObj } from "@storybook/react-vite";
import ScrollButton from "../components/@common/ScrollButton/ScrollButton";

const meta: Meta<typeof ScrollButton> = {
  title: "Common/ScrollButton",
  component: ScrollButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "스크롤 액션을 트리거하는 pill 모양 버튼입니다.\n\n라벨과 더블 화살표 아이콘으로 구성되며, `direction` prop으로 위/아래 방향을 전환할 수 있습니다. 실제 스크롤 동작은 `onClick`을 통해 호출자가 처리합니다.",
      },
    },
    backgrounds: {
      default: "gray",
      values: [
        { name: "gray", value: "#EFF1F4" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
  },
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["down", "up"],
      description: "더블 화살표 방향",
    },
    children: {
      control: { type: "text" },
      description: "버튼 라벨",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScrollButton>;

export const Down: Story = {
  args: {
    direction: "down",
    children: "스페이스 목록",
  },
};

export const Up: Story = {
  args: {
    direction: "up",
    children: "맨 위로",
  },
};
