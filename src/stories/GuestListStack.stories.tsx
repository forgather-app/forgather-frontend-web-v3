import type { Meta, StoryObj } from "@storybook/react-vite";
import GuestListStack from "@/components/@common/GuestListStack/GuestListStack";

const meta: Meta<typeof GuestListStack> = {
  title: "Common/GuestListStack",
  component: GuestListStack,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 328, paddingTop: 24 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "방명록 목록 상단에 표시되는 '새로 도착한 방명록' 스택 카드입니다. " +
          "`count`가 2 이상이면 카드 뒤로 겹쳐진 카드가 살짝 보이며 은은하게 움직이는 애니메이션이 추가됩니다.",
      },
    },
  },
  argTypes: {
    count: {
      control: { type: "number" },
      description:
        "새로 도착한 방명록 개수. 2개 이상이면 스택 형태로 표시됩니다.",
      table: { type: { summary: "number" }, defaultValue: { summary: "1" } },
    },
    onClick: {
      description: "스택 클릭 핸들러",
    },
  },
};

export default meta;

type Story = StoryObj<typeof GuestListStack>;

export const Single: Story = {
  parameters: {
    docs: {
      description: {
        story: "새로 도착한 방명록이 1개일 때 — 겹친 카드 없이 표시됩니다.",
      },
    },
  },
  args: {
    count: 1,
    onClick: () => {},
  },
};

export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story: "새로 도착한 방명록이 여러 개일 때 — 뒤에 카드가 겹쳐 보입니다.",
      },
    },
  },
  args: {
    count: 3,
    onClick: () => {},
  },
};
