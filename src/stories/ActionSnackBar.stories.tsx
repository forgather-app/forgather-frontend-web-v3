import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ActionSnackBar from "@/components/@common/snackBar/ActionSnackBar";
import { theme } from "@/styles/theme";

const meta: Meta<typeof ActionSnackBar> = {
  title: "Common/ActionSnackBar",
  component: ActionSnackBar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          backgroundColor: theme.colors.gray.gray600,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
3초 후 자동으로 닫히며 액션 버튼을 포함한 스낵바입니다.

**특징**
- 마운트 후 3초가 지나면 slideOut 애니메이션과 함께 자동으로 닫힙니다.
- '취소하기' 버튼 클릭 시 \`onClick\` 콜백이 호출된 뒤 즉시 닫힙니다.
- 좌우 스와이프 인터랙션은 없습니다.

**사용 패턴**
\`{isOpen && <ActionSnackBar isOpen={isOpen} onClose={...} onClick={...} message="..." />}\`
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "스낵바 열림 여부. true일 때 마운트합니다.",
      table: { type: { summary: "boolean" } },
    },
    onClose: {
      description: "닫힘 애니메이션 종료 후 호출되는 콜백",
      table: { type: { summary: "() => void" } },
    },
    onClick: {
      description: "액션 버튼 클릭 시 호출되는 콜백",
      table: { type: { summary: "() => void" } },
    },
    message: {
      description: "스낵바에 표시할 메시지",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ActionSnackBar>;

const InteractiveStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px 20px",
          backgroundColor: theme.colors.main.purple,
          color: theme.colors.gray.white,
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        스낵바 열기
      </button>
      {isOpen && (
        <ActionSnackBar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onClick={() => console.log("액션 실행")}
          message="방명록이 가려졌습니다."
        />
      )}
    </>
  );
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "버튼을 클릭해 스낵바를 열고, 3초 후 자동으로 닫히는 동작을 확인할 수 있습니다. '취소하기' 클릭 시 즉시 닫힙니다.",
      },
    },
  },
  render: () => <InteractiveStory />,
};

const OpenStory = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "10px 20px",
            backgroundColor: theme.colors.main.purple,
            color: theme.colors.gray.white,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          다시 열기
        </button>
      )}
      {isOpen && (
        <ActionSnackBar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onClick={() => console.log("액션 실행")}
          message="방명록이 가려졌습니다."
        />
      )}
    </>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "마운트된 직후의 ActionSnackBar. 3초 후 자동으로 닫힙니다.",
      },
    },
  },
  render: () => <OpenStory />,
};

const LONG_MESSAGE =
  "이 스낵바의 메시지가 매우 길어질 때에도 레이아웃이 올바르게 표시되는지 확인할 수 있습니다.";

const LongMessageStory = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "10px 20px",
            backgroundColor: theme.colors.main.purple,
            color: theme.colors.gray.white,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          다시 열기
        </button>
      )}
      {isOpen && (
        <ActionSnackBar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onClick={() => console.log("액션 실행")}
          message={LONG_MESSAGE}
        />
      )}
    </>
  );
};

export const LongMessage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "메시지가 매우 길 때의 ActionSnackBar. 텍스트 줄바꿈과 레이아웃을 확인합니다.",
      },
    },
  },
  render: () => <LongMessageStory />,
};
