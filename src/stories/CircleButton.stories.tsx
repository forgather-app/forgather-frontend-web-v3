import type { Meta, StoryObj } from "@storybook/react-vite";
import shareIcon from "../assets/icons/ic-share.svg";
import CircleButton from "../components/@common/CircleButton/CircleButton";

const meta: Meta<typeof CircleButton> = {
  title: "Common/CircleButton",
  component: CircleButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "40x40 원형 아이콘 버튼입니다.\n\n어두운 배경(gray500)과 그림자를 가지며, 아이콘 전용 액션에 사용합니다. 스크린리더 접근성을 위해 `aria-label`이 필수입니다.",
      },
    },
  },
  argTypes: {
    "aria-label": {
      control: { type: "text" },
      description: "스크린리더가 읽을 버튼 설명",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof CircleButton>;

export const Default: Story = {
  args: {
    "aria-label": "공유하기",
    children: <img src={shareIcon} alt="" width={24} height={24} />,
  },
};
