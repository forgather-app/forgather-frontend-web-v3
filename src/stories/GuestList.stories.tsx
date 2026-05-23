import type { Meta, StoryObj } from "@storybook/react-vite";
import GuestList from "@/components/@common/GuestList/GuestList";

const meta: Meta<typeof GuestList> = {
  title: "Common/GuestList",
  component: GuestList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "방명록 목록의 카드 아이템 컴포넌트입니다. Figma 컴포넌트명: **guest_list**\n\n" +
          "- **기본**: 작성자 이름과 '님의 방명록' 텍스트, 우측 화살표를 표시합니다.\n" +
          "- **`hasPhoto=true`**: 사진 첨부 아이콘을 함께 표시합니다.\n" +
          "- **`isNew=true`**: 새로 도착한 방명록 상태로, primary 컬러 오로라 효과 보더와 함께 알림 텍스트를 표시합니다.",
      },
    },
  },
  argTypes: {
    title: {
      description: "방명록 작성자 이름",
      table: {
        type: { summary: "string" },
      },
    },
    isNew: {
      control: { type: "boolean" },
      description:
        "새로 도착한 방명록 여부. true이면 오로라 효과 보더와 함께 방명록 알림 UI가 노출됩니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    hasPhoto: {
      control: { type: "boolean" },
      description: "사진 첨부 여부. true이면 사진 아이콘을 표시합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof GuestList>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "텍스트만 있는 기본 방명록 카드입니다.",
      },
    },
  },
  args: {
    title: "가면라이더",
    isNew: false,
    hasPhoto: false,
  },
};

export const WithPhoto: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "사진이 첨부된 방명록 카드입니다. 우측에 사진 아이콘이 표시됩니다.",
      },
    },
  },
  args: {
    title: "가면라이더",
    isNew: false,
    hasPhoto: true,
  },
};

export const LongTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: "작성자 이름이 길 때 말줄임 처리를 확인하는 방명록 카드입니다.",
      },
    },
  },
  args: {
    title: "아주아주긴방명록작성자이름을가진가면라이더",
    isNew: false,
    hasPhoto: true,
    onClick: () => {},
  },
};

export const New: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "새로 도착한 방명록 상태입니다. primary 컬러의 오로라 효과 보더가 반짝이며 적용됩니다.",
      },
    },
  },
  args: {
    title: "가면라이더",
    isNew: true,
    hasPhoto: false,
  },
};
