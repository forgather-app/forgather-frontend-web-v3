import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import BottomTabBar from "../components/@common/BottomTabBar/BottomTabBar";
import {
  TAB_ITEMS,
  type TabType,
} from "../components/@common/BottomTabBar/BottomTabBar.constants";

const meta: Meta<typeof BottomTabBar> = {
  title: "Common/BottomTabBar",
  component: BottomTabBar,
  parameters: {
    docs: {
      description: {
        component:
          "앱 하단에 고정되는 내비게이션 바입니다. 홈·방명록·마이 세 개의 탭으로 구성됩니다.",
      },
    },
  },
  argTypes: {
    activeTab: {
      control: "select",
      options: TAB_ITEMS.map((tab) => tab.id),
      description: "현재 활성화된(선택된) 탭",
    },
    onTabChange: {
      action: "onTabChange",
      description: "탭을 눌렀을 때 실행되는 핸들러",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomTabBar>;

export const 홈Active: Story = {
  args: {
    activeTab: "홈",
  },
};

export const 방명록Active: Story = {
  args: {
    activeTab: "방명록",
  },
};

export const 마이Active: Story = {
  args: {
    activeTab: "마이",
  },
};

const InteractiveTemplate = () => {
  const [activeTab, setActiveTab] = useState<TabType>("홈");
  return <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />;
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};
