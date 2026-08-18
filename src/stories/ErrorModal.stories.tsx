import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ErrorModal from "@/components/@common/ErrorModal/ErrorModal";
import { theme } from "@/styles/theme";

const meta: Meta<typeof ErrorModal> = {
  title: "Common/ErrorModal",
  component: ErrorModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
API 요청 실패 등 예기치 못한 에러가 발생했을 때 전역으로 띄우는 알림 모달입니다.

**사용 패턴**
라우터 레벨 에러 바운더리(\`RootErrorBoundary\`)가 에러를 감지하면 이전 페이지로 이동한 뒤,
\`useErrorModal\`을 통해 이 모달을 엽니다. 페이지 코드에서 직접 렌더링할 일은 없습니다.
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "모달 열림 여부",
      table: { type: { summary: "boolean" } },
    },
    onClose: {
      description: "확인 버튼 또는 배경 클릭 시 호출되는 콜백",
      table: { type: { summary: "() => void" } },
    },
    title: {
      description: '모달 제목. 기본값 "나중에 다시 시도해주세요"',
      table: { type: { summary: "string" } },
    },
    description: {
      description: '모달 설명 문구. 기본값 "정보를 불러오지 못했어요."',
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorModal>;

const InteractiveStory = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        backgroundColor: theme.colors.gray.gray700,
      }}
    >
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
          모달 다시 열기
        </button>
      )}
      <ErrorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
      />
    </div>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "기본 문구의 에러 모달입니다.",
      },
    },
  },
  render: () => <InteractiveStory />,
};

export const CustomMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: "제목과 설명을 커스텀 문구로 지정한 경우입니다.",
      },
    },
  },
  render: () => (
    <InteractiveStory
      title="사진을 업로드하지 못했어요"
      description="잠시 후 다시 시도해주세요."
    />
  ),
};
