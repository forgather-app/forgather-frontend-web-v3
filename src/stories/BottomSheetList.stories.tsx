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
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheetList>;

export const TitleOnly: Story = {
  args: {
    title: "가리기 해제",
  },
};

export const WithIconAndDescription: Story = {
  args: {
    title: "가리기 해제",
    icon: <PlaceholderIcon />,
    description: "방명록을 다시 홈에서 확인할 수 있어요",
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "제목이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다",
  },
};

export const LongTitleWithIconAndDescription: Story = {
  args: {
    title:
      "제목이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다 제목이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다제목이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다",
    icon: <PlaceholderIcon />,
    description: "방명록을 다시 홈에서 확인할 수 있어요",
  },
};

export const LongDescriptionWithIconAndDescription: Story = {
  args: {
    title: "제목입니다",
    icon: <PlaceholderIcon />,
    description:
      "설명이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다. 설명이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다.설명이 매우 길어졌을 때 레이아웃이 어떻게 되는지 확인하는 스토리입니다.",
  },
};
