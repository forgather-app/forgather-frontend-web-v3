import type { Meta, StoryObj } from "@storybook/react-vite";
import ExhibitionListButton from "@/components/@common/ExhibitionList/ExhibitionListButton";

const meta: Meta<typeof ExhibitionListButton> = {
  title: "UI/ExhibitionListButton",
  component: ExhibitionListButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "전시 목록 선택 버튼 컴포넌트입니다.\n\n`isSelected`가 `true`이면 단색 배경, `false`이면 그라데이션 배경 + 테두리로 표시됩니다.",
      },
    },
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#111111" }],
    },
  },
  argTypes: {
    isSelected: {
      control: { type: "boolean" },
      description: "선택 여부",
    },
    status: {
      control: { type: "radio" },
      options: ["inProgress", "ended"],
      description: "전시 진행 상태",
    },
    spaceCount: {
      control: { type: "number", min: 0 },
      description: "전시 참여자(방명록) 수",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ExhibitionListButton>;

export const Default: Story = {
  args: {
    isSelected: false,
    thumbnailUrl: "",
    status: "inProgress",
    spaceCount: 5,
    title: "포게더 시각 디자인 전시회",
    period: "26.2.8 - 26.2.10",
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
    thumbnailUrl: "",
    status: "inProgress",
    spaceCount: 5,
    title: "포게더 시각 디자인 전시회",
    period: "26.2.8 - 26.2.10",
  },
};

export const EndedSelected: Story = {
  args: {
    isSelected: true,
    thumbnailUrl: "",
    status: "ended",
    spaceCount: 42,
    title: "포게더 시각 디자인 전시회",
    period: "26.2.8 - 26.2.10",
  },
};
