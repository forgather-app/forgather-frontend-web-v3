import type { Meta, StoryObj } from "@storybook/react-vite";
import ProgressBar from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Common/ProgressBar",
  component: ProgressBar,
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "진행률 (0~100)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

/** 1단계 (33%) */
export const Step1: Story = {
  args: {
    value: 33,
    "aria-label": "1단계 진행 중",
  },
};

/** 2단계 (67%) */
export const Step2: Story = {
  args: {
    value: 67,
    "aria-label": "2단계 진행 중",
  },
};

/** 3단계 완료 (100%) */
export const Step3Complete: Story = {
  args: {
    value: 100,
    "aria-label": "완료",
  },
};

/** 시작 전 (0%) */
export const Empty: Story = {
  args: {
    value: 0,
    "aria-label": "시작 전",
  },
};

/** 인터랙티브 — 슬라이더로 값 조정 */
export const Interactive: Story = {
  args: {
    value: 50,
  },
};
