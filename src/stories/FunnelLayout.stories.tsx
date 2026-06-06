import type { Meta, StoryObj } from "@storybook/react-vite";
import FunnelLayout from "@/shared/funnel/FunnelLayout";
import ItemLayout from "@/shared/funnel/ItemLayout";

const meta: Meta<typeof FunnelLayout> = {
  title: "Shared/FunnelLayout",
  component: FunnelLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "퍼널(단계별 입력) 플로우에 사용되는 레이아웃 컴포넌트. 진행률 바와 단계 제목을 표시합니다. children은 ItemLayout으로 감싸야 합니다.",
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
      description: "단계 제목. 줄바꿈은 \\n 사용.",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FunnelLayout>;

const PlaceholderStep = ({ buttonText }: { buttonText: string }) => (
  <ItemLayout text={buttonText} disabled={false} onClick={() => {}}>
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
  </ItemLayout>
);

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "기본 상태. 1/3 단계." },
    },
  },
  args: {
    stepIndex: 0,
    totalSteps: 3,
    title: "전시 대표 이미지를\n설정해 주세요!",
    children: <PlaceholderStep buttonText="다음" />,
  },
};

export const LastStep: Story = {
  parameters: {
    docs: {
      description: { story: "마지막 단계. 진행률 100%." },
    },
  },
  args: {
    stepIndex: 2,
    totalSteps: 3,
    title: "모든 정보를\n입력하셨습니다!",
    children: <PlaceholderStep buttonText="완료" />,
  },
};
