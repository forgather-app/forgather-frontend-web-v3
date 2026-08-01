import type { Meta, StoryObj } from "@storybook/react-vite";
import GuestList from "@/components/@common/GuestList/GuestList";

const meta: Meta<typeof GuestList> = {
  title: "Common/GuestList",
  component: GuestList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "방명록 목록의 카드 아이템 컴포넌트입니다. Figma 컴포넌트명: **Guest_List**\n\n" +
          "닉네임, 메시지 내용(최대 2줄), 작성 일시, '자세히보기' 링크를 표시합니다. " +
          "`hasPhoto=true`이면 닉네임 우측에 사진 첨부 아이콘이 함께 표시됩니다. " +
          "카드 전체가 클릭 가능하며 클릭 시 방명록 상세로 이동합니다.",
      },
    },
  },
  argTypes: {
    nickname: {
      description: "방문객 닉네임",
      table: { type: { summary: "string" } },
    },
    message: {
      description: "방명록 메시지 내용. 2줄을 초과하면 말줄임 처리됩니다.",
      table: { type: { summary: "string" } },
    },
    createdAt: {
      description: "방명록 작성 일시",
      table: { type: { summary: "Date" } },
    },
    hasPhoto: {
      control: { type: "boolean" },
      description: "사진 첨부 여부. true이면 사진 아이콘을 표시합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      description: "카드(자세히보기) 클릭 핸들러",
    },
  },
};

export default meta;

type Story = StoryObj<typeof GuestList>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "사진 없이 텍스트만 있는 기본 방명록 미리보기 카드입니다.",
      },
    },
  },
  args: {
    nickname: "방문객 닉네임",
    message: "졸업 전시 축하해요! 정말 멋진 작품이었어요.",
    createdAt: new Date(2024, 4, 12, 14, 30),
    hasPhoto: false,
    onClick: () => {},
  },
};

export const WithPhoto: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "사진이 첨부된 방명록 카드입니다. 우측 상단에 사진 아이콘이 표시됩니다.",
      },
    },
  },
  args: {
    nickname: "방문객 닉네임",
    message: "졸업 전시 축하해요! 정말 멋진 작품이었어요.",
    createdAt: new Date(2024, 4, 12, 14, 30),
    hasPhoto: true,
    onClick: () => {},
  },
};

export const LongMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: "메시지가 2줄을 초과할 때 말줄임 처리를 확인하는 카드입니다.",
      },
    },
  },
  args: {
    nickname: "방문객 닉네임 더미텍스트",
    message:
      "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업 전시 축하해 전시 축하해 졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업 전시 축하해 전시 축하해",
    createdAt: new Date(2024, 4, 12, 14, 30),
    hasPhoto: true,
    onClick: () => {},
  },
};
