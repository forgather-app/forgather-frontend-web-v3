import type { Meta, StoryObj } from "@storybook/react-vite";
import SpaceCard from "../components/UI/SpaceCard/SpaceCard";

const meta: Meta<typeof SpaceCard> = {
  title: "UI/SpaceCard",
  component: SpaceCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "나의 스페이스 목록에 표시되는 컴팩트 카드 컴포넌트입니다. 72px 썸네일, 스페이스 제목, 방명록 수를 보여주며 카드 전체가 버튼으로 동작합니다. guestBookCount 미전달 시 방명록 뱃지와 이동 버튼 없이 제목만 2줄까지 표시됩니다.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    title: {
      description: "스페이스 제목. 1줄 초과 시 말줄임 처리됩니다.",
      table: { type: { summary: "string" } },
    },
    guestBookCount: {
      description:
        "방명록 수. 미전달 시 방명록 뱃지·이동 버튼이 사라지고 제목이 2줄까지 표시됩니다.",
      table: { type: { summary: "number | undefined" } },
    },
    thumbnailUrl: {
      description:
        "썸네일 이미지 URL. 미전달 또는 에러 시 exhibition_list.png로 대체됩니다.",
      table: { type: { summary: "string | undefined" } },
    },
    onClick: {
      description: "카드 클릭 핸들러",
      table: { type: { summary: "() => void | undefined" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpaceCard>;

const defaultArgs = {
  title: "포게더 : 작가와 방문객이 연결되는 곳",
  guestBookCount: 12,
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "기본 스페이스 카드입니다. 썸네일 미전달 시 fallback 이미지가 표시됩니다.",
      },
    },
  },
  args: defaultArgs,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithThumbnail: Story = {
  parameters: {
    docs: {
      description: {
        story: "썸네일 이미지가 있는 스페이스 카드입니다.",
      },
    },
  },
  args: {
    ...defaultArgs,
    thumbnailUrl: "https://picsum.photos/seed/forgather/128/128",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export const LongTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: "긴 제목이 1줄로 말줄임 처리되는 케이스입니다.",
      },
    },
  },
  args: {
    title:
      "매우 긴 스페이스 제목이 한 줄을 초과할 경우 말줄임 처리되는 동작을 확인합니다.",
    guestBookCount: 99,
    thumbnailUrl: "https://picsum.photos/seed/forgather2/128/128",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutGuestBookCount: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "guestBookCount 미전달 케이스입니다. 방명록 뱃지와 이동 버튼이 사라지고, 제목이 2줄까지 표시됩니다.",
      },
    },
  },
  args: {
    title:
      "포게더 : 작가와 방문객이 연결되는 곳 포게더 : 작가와 방문객이 연결되는 곳",
    thumbnailUrl: "https://picsum.photos/seed/forgather3/128/128",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};
