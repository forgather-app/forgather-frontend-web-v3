import type { Meta, StoryObj } from "@storybook/react-vite";
import NavigationBar from "../components/@common/navigationBar/NavigationBar";

const meta: Meta<typeof NavigationBar> = {
  title: "Common/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "화면 상단의 내비게이션 바입니다. 뒤로가기·타이틀·우측 아이콘 액션을 조합해 사용합니다.",
      },
    },
  },
  argTypes: {
    title: { description: "중앙에 표시되는 타이틀" },
    rightIcon: { description: "우측에 표시할 SVG 아이콘" },
    rightIconAriaLabel: { description: "우측 아이콘 버튼의 접근성 레이블" },
    onBackClick: {
      action: "뒤로가기 클릭",
      description: "왼쪽 뒤로가기 버튼을 눌렀을 때 실행되는 핸들러",
    },
    onRightIconClick: {
      action: "오른쪽 아이콘 클릭",
      description: "우측 아이콘 버튼을 눌렀을 때 실행되는 핸들러",
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavigationBar>;

const CloseIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8 8L24 24M24 8L8 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MeatballIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="10" cy="16" r="2" fill="currentColor" />
    <circle cx="16" cy="16" r="2" fill="currentColor" />
    <circle cx="22" cy="16" r="2" fill="currentColor" />
  </svg>
);

/** left_Icon 변형 — 뒤로가기 버튼만 */
export const LeftIcon: Story = {
  name: "left_Icon",
  args: {
    onBackClick: () => {},
  },
};

/** icon_title 변형 — 뒤로가기 + 중앙 타이틀 */
export const IconTitle: Story = {
  name: "icon_title",
  args: {
    onBackClick: () => {},
    title: "Title",
  },
};

/** dual_icon_title 변형 — 뒤로가기 + 오른쪽 아이콘 + 중앙 타이틀 */
export const DualIconTitle: Story = {
  name: "dual_icon_title",
  args: {
    onBackClick: () => {},
    rightIcon: <MeatballIcon />,
    rightIconAriaLabel: "더 보기",
    title: "Title",
  },
};

/** dual_icon 변형 — 뒤로가기 + 오른쪽 아이콘 */
export const DualIcon: Story = {
  name: "dual_icon",
  args: {
    onBackClick: () => {},
    rightIcon: <MeatballIcon />,
    rightIconAriaLabel: "더 보기",
  },
};

/** right_Icon 변형 — 오른쪽 아이콘만 */
export const RightIcon: Story = {
  name: "right_Icon",
  args: {
    rightIcon: <CloseIcon />,
    rightIconAriaLabel: "닫기",
  },
};

/** 긴 타이틀 엣지 케이스 */
export const LongTitle: Story = {
  name: "long_title (엣지 케이스)",
  args: {
    onBackClick: () => {},
    rightIcon: <MeatballIcon />,
    rightIconAriaLabel: "더 보기",
    title: "전시 방명록",
  },
};
