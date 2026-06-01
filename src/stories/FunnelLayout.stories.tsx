import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "@/components/@common/button/Button";
import FunnelLayout from "@/shared/funnel/FunnelLayout";

const meta: Meta<typeof FunnelLayout> = {
  title: "Shared/FunnelLayout",
  component: FunnelLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "퍼널(단계별 입력) 플로우에 사용되는 레이아웃 컴포넌트. 진행률 바, 제목, 컨텐츠 슬롯, 하단 버튼 슬롯으로 구성됩니다. `button` prop으로 버튼을 주입합니다.",
      },
    },
  },
  argTypes: {
    stepIndex: {
      description: "현재 단계 인덱스 (0부터 시작)",
      control: { type: "number", min: 0 },
      table: { type: { summary: "number" } },
    },
    totalSteps: {
      description: "전체 단계 수",
      control: { type: "number", min: 1 },
      table: { type: { summary: "number" } },
    },
    title: {
      description: "상단 제목. 줄바꿈은 \\n 사용.",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FunnelLayout>;

const PlaceholderContent = () => (
  <div
    style={{
      height: 328,
      backgroundColor: "#252930",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6D7684",
      fontSize: 14,
    }}
  >
    컨텐츠 영역
  </div>
);

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "기본 상태. 1/3 단계, button slot에 버튼 주입.",
      },
    },
  },
  args: {
    stepIndex: 0,
    totalSteps: 3,
    title: "전시 대표 이미지를\n설정해 주세요!",
    children: <PlaceholderContent />,
    button: <Button text="다음" onClick={() => {}} />,
  },
};

export const LastStep: Story = {
  parameters: {
    docs: {
      description: {
        story: "마지막 단계. 진행률 100%.",
      },
    },
  },
  args: {
    stepIndex: 2,
    totalSteps: 3,
    title: "모든 정보를\n입력하셨습니다!",
    children: <PlaceholderContent />,
    button: <Button text="완료" onClick={() => {}} />,
  },
};
