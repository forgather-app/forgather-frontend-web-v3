import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import BottomSheet from "../components/@common/BottomSheet/BottomSheet";
import BottomSheetList from "../components/@common/BottomSheet/List/BottomSheetList";
import { theme } from "../styles/theme";

const meta: Meta<typeof BottomSheet> = {
  title: "Common/BottomSheet/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          backgroundColor: theme.colors.gray.gray600,
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
        component: `
바텀시트 컨테이너 컴포넌트입니다. Backdrop과 콘텐츠 영역으로 구성됩니다.
grabBar의 width는 작지만, 해당 컴포넌트를 감싸는 눈에 보이지 않는 컴포넌트를 두어 드래그가 편하도록 구성했습니다.

전체 바텀시트 영역에서 아래로 드래그해 닫히도록 구성하고 싶었지만, 내부에 리스트처럼 길이가 길어 자체 스크롤/드래그가 발생하는 컴포넌트가 들어가는 경우 바텀시트 닫기 제스처와 내부 드래그 이벤트가 자주 충돌했습니다.
현재는 이런 충돌을 줄이고 인터랙션을 안정적으로 유지하기 위해 grab bar 중심으로 드래그 닫기 경험을 제공하고 있습니다.
이 때문에 grab bar의 실제 인터랙션 가능 영역은 피그마 시안보다 조금 더 크게 잡았습니다.
📱 드래그 인터랙션 확인은 Storybook 패널이 아닌 전체화면에 가깝게 보는 환경을 권장합니다.

**구조**
- \`Backdrop\`: 반투명 오버레이. 클릭 시 \`onClose\` 호출
- \`Container\`: 실제 콘텐츠를 담는 영역. 상단 모서리가 둥글게 처리됩니다.

**인터랙션**
Backdrop 클릭 시 외부에서 \`onClose\`를 통해 시트를 닫아야 합니다. controlled 컴포넌트입니다.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

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

const InteractiveStory = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        바텀시트 열기
      </button>
      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
        </BottomSheet>
      )}
    </>
  );
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "버튼을 클릭해 바텀시트를 열고, Backdrop을 클릭해 닫는 인터랙션을 확인할 수 있습니다.",
      },
    },
  },
  render: () => <InteractiveStory />,
};

const OpenStory = () => {
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
        바텀시트 열기
      </button>
      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <BottomSheetList title="가리기 해제" />
          <BottomSheetList title="삭제하기" />
          <BottomSheetList title="신고하기" />
        </BottomSheet>
      )}
    </>
  );
};

export const Open: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "버튼을 클릭해 바텀시트를 열고, Backdrop을 클릭해 닫는 인터랙션을 확인할 수 있습니다.",
      },
    },
  },
  render: () => <OpenStory />,
};
