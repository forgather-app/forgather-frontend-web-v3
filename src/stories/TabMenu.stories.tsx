import type { Meta, StoryObj } from "@storybook/react-vite";
import TabMenu from "../components/@common/TabMenu/TabMenu";

const meta: Meta<typeof TabMenu> = {
  title: "UI/TabMenu",
  component: TabMenu,
  parameters: {
    docs: {
      description: {
        component: `
두 개의 탭을 전환하는 메뉴 컴포넌트입니다.

**Variant**
- \`pill\`: 둥근 알약 형태. 어두운 배경 위에서 사용합니다.
- \`box\`: 사각형 세그먼트 형태. 카드·패널 내부에서 사용합니다.

**인터랙션**
탭 클릭 시 슬라이딩 인디케이터가 부드럽게 이동합니다.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "탭 메뉴의 시각적 스타일",
      control: { type: "radio" },
      options: ["pill", "box"],
      table: {
        type: { summary: '"pill" | "box"' },
      },
    },
    left: {
      description: "왼쪽 탭의 텍스트와 클릭 핸들러",
      table: {
        type: { summary: "{ text: string; onClick: () => void }" },
      },
    },
    right: {
      description: "오른쪽 탭의 텍스트와 클릭 핸들러",
      table: {
        type: { summary: "{ text: string; onClick: () => void }" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabMenu>;

const defaultArgs = {
  left: { text: "카드 보기", onClick: () => {} },
  right: { text: "목록 보기", onClick: () => {} },
};

export const Pill: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "어두운 배경 위에서 사용하는 알약 형태 탭입니다. 활성 탭이 흰색 pill로 표시됩니다.",
      },
    },
  },
  args: {
    variant: "pill",
    ...defaultArgs,
  },
};

export const Box: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "카드·패널 내부에서 사용하는 사각형 세그먼트 탭입니다. 활성 탭이 회색 박스로 표시됩니다.",
      },
    },
  },
  args: {
    variant: "box",
    ...defaultArgs,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};
