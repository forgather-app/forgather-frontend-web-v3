import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import BottomSheet from "../components/@common/BottomSheet/BottomSheet";
import BottomSheetList from "../components/@common/BottomSheet/List/BottomSheetList";
import { theme } from "../styles/theme";

const meta: Meta<typeof BottomSheet> = {
  title: "UI/BottomSheet/BottomSheet",
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
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
바텀시트 컨테이너 컴포넌트입니다. Backdrop과 콘텐츠 영역으로 구성됩니다.

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

const InteractiveStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
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
