import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import BottomTabBar from "../components/@common/bottomTabBar/BottomTabBar";
import {
  TAB_ITEMS,
  type TabType,
} from "../components/@common/bottomTabBar/BottomTabBar.constants";

const meta: Meta<typeof BottomTabBar> = {
  title: "Common/BottomTabBar",
  component: BottomTabBar,
  argTypes: {
    activeTab: {
      control: "select",
      options: TAB_ITEMS.map((tab) => tab.id),
    },
    onTabChange: { action: "onTabChange" },
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
