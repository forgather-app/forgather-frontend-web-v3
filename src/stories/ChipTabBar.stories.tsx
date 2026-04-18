import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ChipTabBar from "@/components/@common/TabBar/ChipTabBar";

const meta: Meta<typeof ChipTabBar> = {
  title: "UI/ChipTabBar",
  component: ChipTabBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
탭 텍스트와 카운터 칩을 함께 표시하는 underline 스타일 탭 바입니다.

**특징**
- 항상 칩을 포함합니다. 칩 없는 탭이 필요하면 \`TabMenu\`를 사용하세요.
- \`activeTab\` prop으로 외부에서 상태를 제어하는 controlled 컴포넌트입니다.
- 탭 전환 시 underline 인디케이터가 슬라이딩 애니메이션으로 이동합니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{ width: 360, backgroundColor: "#1B1D1F", padding: "16px 0" }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ChipTabBar>;

const defaultArgs = {
  left: { text: "스페이스", onClick: () => {}, chipText: "7개" },
  right: { text: "전시", onClick: () => {}, chipText: "6개" },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: "탭을 직접 클릭해 슬라이딩 애니메이션을 확인할 수 있습니다.",
      },
    },
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState<"left" | "right">("left");
    return (
      <ChipTabBar
        {...args}
        activeTab={activeTab}
        left={{ ...args.left, onClick: () => setActiveTab("left") }}
        right={{ ...args.right, onClick: () => setActiveTab("right") }}
      />
    );
  },
  args: defaultArgs,
};

export const LeftActive: Story = {
  parameters: {
    docs: {
      description: {
        story: "왼쪽 탭이 활성화된 초기 상태입니다.",
      },
    },
  },
  args: {
    activeTab: "left",
    ...defaultArgs,
  },
};

export const RightActive: Story = {
  parameters: {
    docs: {
      description: {
        story: "오른쪽 탭이 활성화된 상태입니다.",
      },
    },
  },
  args: {
    activeTab: "right",
    ...defaultArgs,
  },
};
