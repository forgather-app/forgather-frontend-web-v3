import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import FilterChip from "../components/@common/Chip/FilterChip/FilterChip";

const meta: Meta<typeof FilterChip> = {
  title: "Common/FilterChip",
  component: FilterChip,
  tags: ["autodocs"],
  argTypes: {
    label: { description: "칩에 표시될 텍스트" },
    isSelected: { description: "선택 상태" },
    onClick: { description: "클릭 핸들러" },
  },
};

export default meta;

type Story = StoryObj<typeof FilterChip>;

export const Selected: Story = {
  parameters: {
    docs: { description: { story: "선택된 상태 — 보라색 배경과 테두리." } },
  },
  args: { label: "전체", isSelected: true, onClick: () => {} },
};

export const Default: Story = {
  parameters: {
    docs: { description: { story: "미선택 상태 — 회색 테두리와 텍스트." } },
  },
  args: { label: "이미지 방명록", isSelected: false, onClick: () => {} },
};

export const Interactive: Story = {
  parameters: {
    docs: { description: { story: "클릭으로 selected 상태를 토글합니다." } },
  },
  render: (args) => {
    const [isSelected, setIsSelected] = useState(args.isSelected);
    return (
      <FilterChip
        {...args}
        isSelected={isSelected}
        onClick={() => setIsSelected((v) => !v)}
      />
    );
  },
  args: { label: "스크랩", isSelected: false },
};
