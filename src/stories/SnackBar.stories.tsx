import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SnackBar from "@/components/@common/SnackBar/SnackBar";
import { theme } from "@/styles/theme";

const meta: Meta<typeof SnackBar> = {
  title: "Common/SnackBar",
  component: SnackBar,
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
3초 후 자동으로 닫히며, 좌우 스와이프로도 닫을 수 있는 스낵바입니다.

**특징**
- 마운트 후 3초가 지나면 slideOut 애니메이션과 함께 자동으로 닫힙니다.
- 좌우 스와이프(80px 이상)로 즉시 닫을 수 있습니다.
- \`IconType\`에 따라 왼쪽에 아이콘 영역이 표시됩니다.
  - \`'alert'\`: 체크 아이콘 영역 (정보/성공)
  - \`'error'\`: 경고 아이콘 영역 (에러)
  - \`undefined\`: 아이콘 없음

**사용 패턴**
\`{show && <SnackBar onClose={() => setShow(false)} message="..." />}\`
        `,
      },
    },
  },
  argTypes: {
    onClose: {
      description:
        "닫힘 애니메이션 종료 후 호출되는 콜백. 부모에서 컴포넌트를 언마운트합니다.",
      table: { type: { summary: "() => void" } },
    },
    message: {
      description: "스낵바에 표시할 메시지",
      table: { type: { summary: "string" } },
    },
    iconType: {
      description:
        "아이콘 타입. 'alert'는 체크 아이콘, 'error'는 경고 아이콘, undefined면 아이콘 없음",
      table: { type: { summary: "'alert' | 'error' | undefined" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SnackBar>;

const makeStory = (message: string, iconType?: "alert" | "error") => () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShow(true)}
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
      {show && (
        <SnackBar
          onClose={() => setShow(false)}
          message={message}
          iconType={iconType}
        />
      )}
    </>
  );
};

const LONG_MESSAGE =
  "이 스낵바의 메시지가 매우 길어질 때에도 레이아웃이 올바르게 표시되는지 확인할 수 있습니다.";

const DefaultStoryComponent = makeStory("일반 스낵바 내용을 입력해주세요");
const ErrorStoryComponent = makeStory("알럿 내용을 입력해주세요", "error");
const AlertStoryComponent = makeStory(
  "일반 스낵바 내용을 입력해주세요",
  "alert",
);
const LongMessageStoryComponent = makeStory(LONG_MESSAGE);
const LongMessageErrorStoryComponent = makeStory(LONG_MESSAGE, "error");
const LongMessageAlertStoryComponent = makeStory(LONG_MESSAGE, "alert");

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "아이콘 없는 기본 스낵바. 3초 후 자동으로 닫히며, 좌우 스와이프로도 닫을 수 있습니다.",
      },
    },
  },
  render: () => <DefaultStoryComponent />,
};

export const ErrorType: Story = {
  parameters: {
    docs: {
      description: {
        story: "error 타입 스낵바. 왼쪽에 경고 아이콘 영역이 표시됩니다.",
      },
    },
  },
  render: () => <ErrorStoryComponent />,
};

export const AlertType: Story = {
  parameters: {
    docs: {
      description: {
        story: "alert 타입 스낵바. 왼쪽에 체크 아이콘 영역이 표시됩니다.",
      },
    },
  },
  render: () => <AlertStoryComponent />,
};

export const LongMessage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "메시지가 매우 길 때의 기본 스낵바. 텍스트 줄바꿈과 레이아웃을 확인합니다.",
      },
    },
  },
  render: () => <LongMessageStoryComponent />,
};

export const LongMessageError: Story = {
  parameters: {
    docs: {
      description: {
        story: "메시지가 매우 길 때의 error 타입 스낵바.",
      },
    },
  },
  render: () => <LongMessageErrorStoryComponent />,
};

export const LongMessageAlert: Story = {
  parameters: {
    docs: {
      description: {
        story: "메시지가 매우 길 때의 alert 타입 스낵바.",
      },
    },
  },
  render: () => <LongMessageAlertStoryComponent />,
};
