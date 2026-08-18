import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import QrBottomSheetContent from "../components/UI/QrBottomSheetContent/QrBottomSheetContent";
import { theme } from "../styles/theme";

const meta: Meta<typeof QrBottomSheetContent> = {
  title: "UI/QrBottomSheetContent",
  component: QrBottomSheetContent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          backgroundColor: theme.colors.gray.gray700,
          overflowY: "auto",
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
        component:
          "QR 코드를 보여주고 이미지로 저장할 수 있는 바텀시트입니다. qrValue를 QR 코드로 인코딩해 클라이언트에서 직접 생성하며, 생성에 실패하면(예: 인코딩 가능한 길이를 초과한 값) 흐린 배경 위에 느낌표 아이콘을 표시합니다.",
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "바텀시트 열림 여부",
    },
    onClose: {
      description: "닫힘 애니메이션 종료 후 호출되는 콜백",
    },
    qrValue: {
      description: "QR 코드로 인코딩할 값(링크 등)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof QrBottomSheetContent>;

const StorybookBodyScrollUnlock = ({ isOpen }: { isOpen: boolean }) => {
  useEffect(() => {
    if (!isOpen) return;
    if (window.self === window.top) return;

    const frameId = requestAnimationFrame(() => {
      document.body.style.overflow = "auto";
    });

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return null;
};

const InteractiveStory = ({ qrValue }: { qrValue: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <StorybookBodyScrollUnlock isOpen={isOpen} />
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
        QR 바텀시트 열기
      </button>
      {isOpen && (
        <QrBottomSheetContent
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          qrValue={qrValue}
        />
      )}
    </>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "정상적으로 QR 코드가 생성된 기본 상태입니다.",
      },
    },
  },
  render: () => (
    <InteractiveStory qrValue="https://forgather.app/spaces/1/guestbook/write" />
  ),
};

export const GenerationError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "QR 코드로 인코딩하기엔 너무 긴 값을 넣어 실제 생성 실패를 재현한 상태입니다. 흐린 배경 위에 느낌표 아이콘이 표시되고 저장 버튼은 비활성화됩니다.",
      },
    },
  },
  render: () => <InteractiveStory qrValue={"a".repeat(4000)} />,
};
