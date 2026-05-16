import type { Meta, StoryObj } from "@storybook/react-vite";
import SpaceFileCard from "../components/ui/spaceFileCard/SpaceFileCard";

const meta: Meta<typeof SpaceFileCard> = {
  title: "UI/SpaceFileCard",
  component: SpaceFileCard,
  parameters: {
    docs: {
      description: {
        component:
          '파일 형태의 스페이스 카드 컴포넌트입니다. 썸네일 이미지 위에 그라디언트 오버레이와 방문객 배지가 표시되며, variant="new"일 때 새 방문객 수를 나타내는 빨간 배지가 추가됩니다.',
      },
    },
    layout: "centered",
  },
  argTypes: {
    title: {
      description: "스페이스 제목",
      table: { type: { summary: "string" } },
    },
    guestCount: {
      description: "방문객 수",
      table: { type: { summary: "number" } },
    },
    thumbnailUrl: {
      description:
        "썸네일 이미지 URL. 미전달 또는 에러 시 fallback 이미지가 표시됩니다.",
      table: { type: { summary: "string | undefined" } },
    },
    variant: {
      description:
        "카드 variant. default는 기본 카드, new는 새 방문객 알림 배지(빨간 +N)가 추가됩니다.",
      control: { type: "radio" },
      options: ["default", "new"],
      table: {
        type: { summary: '"default" | "new"' },
        defaultValue: { summary: "default" },
      },
    },
    newGuestCount: {
      description: '새 방문객 수. variant="new"일 때 빨간 배지에 표시됩니다.',
      table: { type: { summary: "number | undefined" } },
    },
    onClick: {
      description: "카드 클릭 핸들러",
      table: { type: { summary: "() => void | undefined" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpaceFileCard>;

const defaultArgs = {
  title: "스페이스 이름 더미텍스트 더미텍스트",
  guestCount: 12,
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "기본 스페이스 파일 카드입니다.",
      },
    },
  },
  args: defaultArgs,
};

export const WithNewGuests: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "새 방문객 알림 variant. 빨간 +N 배지가 방문객 배지 옆에 표시됩니다.",
      },
    },
  },
  args: {
    ...defaultArgs,
    variant: "new",
    newGuestCount: 2,
  },
};

export const WithThumbnail: Story = {
  parameters: {
    docs: {
      description: {
        story: "썸네일 이미지가 있는 스페이스 파일 카드입니다.",
      },
    },
  },
  args: {
    ...defaultArgs,
    thumbnailUrl: "https://picsum.photos/seed/forgather/141/126",
  },
};

export const WithThumbnailAndNew: Story = {
  parameters: {
    docs: {
      description: {
        story: "썸네일 이미지 + 새 방문객 알림이 함께 표시되는 카드입니다.",
      },
    },
  },
  args: {
    ...defaultArgs,
    thumbnailUrl: "https://picsum.photos/seed/forgather/141/126",
    variant: "new",
    newGuestCount: 5,
  },
};

export const LongTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: "긴 제목이 2줄로 말줄임 처리되는 케이스입니다.",
      },
    },
  },
  args: {
    title: "매우 긴 스페이스 이름이 두 줄을 초과할 경우 말줄임 처리됩니다",
    guestCount: 99,
  },
};
