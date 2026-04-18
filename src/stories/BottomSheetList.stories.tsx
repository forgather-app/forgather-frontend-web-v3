import type { Meta, StoryObj } from "@storybook/react-vite";
import BottomSheetList from "../components/@common/BottomSheet/List/BottomSheetList";

const PlaceholderIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="아이콘"
  >
    <rect width="24" height="24" rx="4" fill="#6D7684" />
  </svg>
);

const meta: Meta<typeof BottomSheetList> = {
  title: "UI/BottomSheet/List",
  component: BottomSheetList,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1B1D1F" }],
    },
    docs: {
      description: {
        component: `BottomSheet 내부에서 사용하는 목록 항목 컴포넌트입니다.

**Props 조합**
- \`title\` only: 아이콘·설명 없이 제목만 표시
- \`title\` + \`icon\` + \`description\`: 아이콘과 설명을 함께 표시. \`icon\`을 넣으면 \`description\`도 반드시 필요합니다.

**인터랙션 상태**
hover/active 상태는 직접 마우스를 올리거나 클릭해서 확인할 수 있습니다.
- **hover**: 배경색이 \`gray600\`으로 밝아집니다.
- **active**: 배경색이 \`black\`으로 어두워집니다.`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheetList>;

export const TitleOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "제목만 있는 기본형입니다. 마우스를 올리거나 클릭해 hover/active 상태를 확인할 수 있습니다.",
      },
    },
  },
  args: {
    title: "가리기 해제",
  },
};

export const WithIconAndDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "아이콘과 설명이 함께 표시되는 형태입니다. 마우스를 올리거나 클릭해 hover/active 상태를 확인할 수 있습니다.",
      },
    },
  },
  args: {
    title: "가리기 해제",
    icon: <PlaceholderIcon />,
    description: "방명록을 다시 홈에서 확인할 수 있어요",
  },
};

export const LongTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: "제목이 길어지면 말줄임(...)으로 처리됩니다.",
      },
    },
  },
  args: {
    title:
      "제목이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다",
  },
};

export const LongTitleWithIconAndDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "아이콘이 있을 때 제목이 길어지면 아이콘 너비를 제외한 나머지 영역에서 말줄임 처리됩니다.",
      },
    },
  },
  args: {
    title:
      "제목이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다 제목이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다제목이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다",
    icon: <PlaceholderIcon />,
    description: "방명록을 다시 홈에서 확인할 수 있어요",
  },
};

export const LongDescriptionWithIconAndDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: "설명이 길어지면 말줄임(...)으로 처리됩니다.",
      },
    },
  },
  args: {
    title: "제목입니다",
    icon: <PlaceholderIcon />,
    description:
      "설명이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다. 설명이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다.설명이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다.",
  },
};
