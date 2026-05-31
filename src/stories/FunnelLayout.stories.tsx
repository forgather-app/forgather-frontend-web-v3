import type { Meta, StoryObj } from "@storybook/react-vite";
import FunnelLayout from "@/shared/funnel/FunnelLayout";

const meta: Meta<typeof FunnelLayout> = {
  title: "Shared/FunnelLayout",
  component: FunnelLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "퍼널(단계별 입력) 플로우에 사용되는 레이아웃 컴포넌트. 상단 진행률 바, 제목 슬롯, 컨텐츠 슬롯, 하단 버튼으로 구성됩니다. `buttonDisabled`로 버튼 활성화 여부를 제어할 수 있습니다.",
      },
    },
  },
  argTypes: {
    step: {
      description: "현재 단계 (1부터 시작)",
      control: { type: "number", min: 1 },
      table: { type: { summary: "number" } },
    },
    totalSteps: {
      description: "전체 단계 수",
      control: { type: "number", min: 1 },
      table: { type: { summary: "number" } },
    },
    title: {
      description: "상단 제목. ReactNode를 받으므로 JSX도 사용 가능합니다.",
      table: { type: { summary: "ReactNode" } },
    },
    buttonText: {
      description: "하단 버튼 텍스트",
      table: { type: { summary: "string" } },
    },
    buttonDisabled: {
      description:
        "하단 버튼 비활성화 여부. 필수 입력 미완료 시 true로 설정합니다.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onButtonClick: {
      description: "하단 버튼 클릭 핸들러",
      table: { type: { summary: "() => void" } },
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
        story: "기본 상태. 진행률 33%, 버튼 활성화.",
      },
    },
  },
  args: {
    step: 1,
    totalSteps: 3,
    title: "전시 대표 이미지를\n설정해 주세요!",
    buttonText: "다음",
    buttonDisabled: false,
    onButtonClick: () => {},
    children: <PlaceholderContent />,
  },
};

export const ButtonDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "버튼 비활성화 상태. 필수 입력값을 아직 채우지 않은 경우에 사용합니다.",
      },
    },
  },
  args: {
    step: 1,
    totalSteps: 3,
    title: "전시 대표 이미지를\n설정해 주세요!",
    buttonText: "다음",
    buttonDisabled: true,
    onButtonClick: () => {},
    children: <PlaceholderContent />,
  },
};

export const LastStep: Story = {
  parameters: {
    docs: {
      description: {
        story: "마지막 단계. 진행률 100%이며 완료 버튼을 표시합니다.",
      },
    },
  },
  args: {
    step: 3,
    totalSteps: 3,
    title: "모든 정보를\n입력하셨습니다!",
    buttonText: "완료",
    buttonDisabled: false,
    onButtonClick: () => {},
    children: <PlaceholderContent />,
  },
};
