import type { Meta, StoryObj } from "@storybook/react-vite";
import TabMenu from "./TabMenu";

const meta: Meta<typeof TabMenu> = {
  title: "UI/TabMenu",
  component: TabMenu,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["pill", "box"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabMenu>;

const defaultArgs = {
  left: { text: "카드 보기", onClick: () => {} },
  right: { text: "목록 보기", onClick: () => {} },
};

export const Pill: Story = {
  args: {
    variant: "pill",
    ...defaultArgs,
  },
};

export const Box: Story = {
  args: {
    variant: "box",
    ...defaultArgs,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};
