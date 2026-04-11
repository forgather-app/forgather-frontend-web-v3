import type { Meta, StoryObj } from "@storybook/react-vite";
import ExhibitionList from "@/components/@common/ExhibitionList/ExhibitionList";

const meta: Meta<typeof ExhibitionList> = {
  title: "UI/ExhibitionList",
  component: ExhibitionList,
  parameters: {
    docs: {
      description: {
        component:
          "전시 정보를 표시하는 display 전용 카드 컴포넌트입니다.\n\n인터랙션이 없는 순수 display 용도로 사용됩니다. 버튼 기능이 필요한 경우 `ExhibitionListButton`을 사용하세요.",
      },
    },
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#111111" }],
    },
  },
  argTypes: {
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

type Story = StoryObj<typeof ExhibitionList>;

export const InProgress: Story = {
  args: {
    thumbnailUrl: "",
    status: "inProgress",
    spaceCount: 5,
    title: "포게더 시각 디자인 전시회",
    period: "26.2.8 - 26.2.10",
  },
};

export const Ended: Story = {
  args: {
    thumbnailUrl: "",
    status: "ended",
    spaceCount: 42,
    title: "포게더 시각 디자인 전시회",
    period: "26.2.8 - 26.2.10",
  },
};

export const LongTitle: Story = {
  args: {
    thumbnailUrl: "",
    status: "inProgress",
    spaceCount: 3,
    title: "매우 긴 전시회 제목이 들어왔을 때 말줄임표 처리 확인용 전시회",
    period: "26.2.8 - 26.2.10",
  },
};

export const ZeroCount: Story = {
  args: {
    thumbnailUrl: "",
    status: "inProgress",
    spaceCount: 0,
    title: "포게더 시각 디자인 전시회",
    period: "26.2.8 - 26.2.10",
  },
};
