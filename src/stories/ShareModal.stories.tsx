import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ShareModal from "../components/UI/ShareModal/ShareModal";
import { theme } from "../styles/theme";

const meta: Meta<typeof ShareModal> = {
  title: "UI/ShareModal",
  component: ShareModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          backgroundColor: theme.colors.gray.gray700,
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
          "스페이스를 초대/공유하기 위한 모달입니다. 카카오톡 공유, 링크 복사, QR 이미지 저장 세 가지 액션을 제공합니다. 카카오톡 공유와 QR 저장은 실제 동작(네이티브 브릿지, QR 생성)이 아직 연결되지 않은 UI 전용 구현입니다.",
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "모달 열림 여부",
    },
    onClose: {
      description: "모달을 닫을 때 호출되는 콜백",
    },
    onKakaoShare: {
      description: "카카오톡으로 보내기 클릭 핸들러",
    },
    onCopyLink: {
      description: "클립보드에 복사하기 클릭 핸들러",
    },
    onSaveQr: {
      description: "QR 이미지 저장하기 클릭 핸들러",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ShareModal>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "모달이 열려있는 기본 상태입니다.",
      },
    },
  },
  args: {
    isOpen: true,
    onClose: () => {},
    onCopyLink: () => {},
    onSaveQr: () => {},
  },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: "열림/닫힘 상태를 직접 토글해볼 수 있는 인터랙티브 예시입니다.",
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCopyLink={() => {}}
        onSaveQr={() => {}}
      />
    );
  },
};
