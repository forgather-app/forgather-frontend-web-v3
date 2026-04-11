import type { Meta, StoryObj } from "@storybook/react-vite";
import NavigationBar from "../components/@common/navigationBar/NavigationBar";

/** 뒤로가기·닫기·메뉴 등의 아이콘 액션을 포함한 앱 내비게이션 바.
 * - `onBackClick` 전달 시 왼쪽 뒤로가기 버튼(ic_back_32) 표시
 * - `rightIcon` 전달 시 오른쪽 아이콘 표시
 * - `title` 전달 시 중앙 타이틀 표시
 */
const meta: Meta<typeof NavigationBar> = {
  title: "Common/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onBackClick: { action: "뒤로가기 클릭" },
    onRightIconClick: { action: "오른쪽 아이콘 클릭" },
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
