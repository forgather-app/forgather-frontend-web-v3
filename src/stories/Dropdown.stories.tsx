import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Dropdown from "../components/@common/Dropdown/Dropdown";
import { theme } from "../styles/theme";

const meta: Meta<typeof Dropdown> = {
  title: "Common/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "케밥(더보기) 아이콘 등 트리거 아래에 앵커 형태로 뜨는 작은 드롭다운 메뉴입니다.\n\n" +
          "바깥 클릭·Esc·항목 선택 시 자동으로 닫힙니다. 트리거를 감싸는 요소에 `position: relative`를 직접 지정해 사용하세요.",
      },
    },
  },
  argTypes: {
    isOpen: { description: "드롭다운 열림 여부" },
    onClose: {
      description: "바깥 클릭 · Esc · 항목 선택 시 호출되는 닫기 콜백",
    },
    items: { description: "표시할 항목 목록 (label, onClick)" },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const DefaultStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        maxWidth: 400,
        padding: 16,
        backgroundColor: theme.colors.gray.gray700,
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          padding: 8,
          color: theme.colors.gray.gray400,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ⋮
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={[
          { label: "삭제하기", onClick: () => alert("삭제하기 클릭") },
          { label: "수정하기", onClick: () => alert("수정하기 클릭") },
        ]}
      />
    </div>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "트리거 버튼을 클릭하면 아래에 앵커되어 드롭다운이 열립니다.",
      },
    },
  },
  render: () => <DefaultStory />,
};
