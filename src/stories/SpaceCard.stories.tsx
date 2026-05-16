import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SpaceCard from "../components/ui/spaceCard/SpaceCard";

const meta: Meta<typeof SpaceCard> = {
  title: "UI/SpaceCard",
  component: SpaceCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "스페이스 정보를 표시하는 카드 컴포넌트입니다. 배경 이미지, 스페이스 제목, 연결된 전시명, 방문객 수를 보여줍니다. 누르는 동안 dark 배경으로 전환되며, onPinClick 전달 시 핀 고정 버튼이 표시됩니다.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    title: {
      description: "스페이스 제목",
      table: { type: { summary: "string" } },
    },
    exhibitionName: {
      description: "연결된 전시 이름",
      table: { type: { summary: "string" } },
    },
    guestCount: {
      description: "방문객 수",
      table: { type: { summary: "number" } },
    },
    backgroundImageUrl: {
      description:
        "배경 이미지 URL. 미전달 또는 에러 시 space_card.png로 대체됩니다.",
      table: { type: { summary: "string | undefined" } },
    },
    onClick: {
      description: "카드 클릭 핸들러.",
      table: { type: { summary: "() => void | undefined" } },
    },
    isPinned: {
      description:
        "핀 고정 여부. true면 아이콘이 흰색(active), false면 검정(inactive).",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onPinClick: {
      description:
        "핀 버튼 클릭 핸들러. 전달 시 카드 상단 좌측에 핀 버튼이 표시됩니다.",
      table: { type: { summary: "() => void | undefined" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpaceCard>;

const defaultArgs = {
  title: "포게더 : 작가와 방문객이 연결되는 곳",
  exhibitionName: "포게더 시각 디자인 전시회",
  guestCount: 12,
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "기본 스페이스 카드입니다. 누르는 동안 dark 배경으로 전환됩니다.",
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

export const PinInteractive: Story = {
  parameters: {
    docs: {
      description: {
        story: "핀 버튼을 클릭하면 active/inactive 상태가 토글됩니다.",
      },
    },
  },
  args: defaultArgs,
  render: (args) => {
    const [isPinned, setIsPinned] = useState(false);
    return (
      <div style={{ width: 328 }}>
        <SpaceCard
          {...args}
          isPinned={isPinned}
          onPinClick={() => setIsPinned((prev) => !prev)}
        />
      </div>
    );
  },
};

export const PinInactive: Story = {
  parameters: {
    docs: {
      description: {
        story: "핀 버튼 Inactive 상태 — 아이콘이 검정색으로 표시됩니다.",
      },
    },
  },
  args: {
    ...defaultArgs,
    isPinned: false,
    onPinClick: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export const PinActive: Story = {
  parameters: {
    docs: {
      description: {
        story: "핀 버튼 Active 상태 — 아이콘이 흰색으로 표시됩니다.",
      },
    },
  },
  args: {
    ...defaultArgs,
    isPinned: true,
    onPinClick: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutExhibition: Story = {
  parameters: {
    docs: {
      description: {
        story: "exhibitionName 미전달 시 '연결된 전시 없음'이 표시됩니다.",
      },
    },
  },
  args: {
    title: "포게더 : 작가와 방문객이 연결되는 곳",
    guestCount: 5,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithBackgroundImage: Story = {
  parameters: {
    docs: {
      description: {
        story: "배경 이미지가 있는 스페이스 카드입니다.",
      },
    },
  },
  args: {
    ...defaultArgs,
    backgroundImageUrl: "https://picsum.photos/seed/forgather/328/120",
    isPinned: false,
    onPinClick: () => {},
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
        story: "긴 제목이 2줄로 말줄임 처리되는 케이스입니다.",
      },
    },
  },
  args: {
    title:
      "매우 긴 스페이스 제목이 두 줄을 초과할 경우 말줄임 처리되는 동작을 확인합니다. 이 제목은 의도적으로 길게 작성되었습니다.",
    exhibitionName: "포게더 시각 디자인 전시회",
    guestCount: 99,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};
