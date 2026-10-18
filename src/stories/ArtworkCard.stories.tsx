import type { Meta, StoryObj } from "@storybook/react-vite";
import ArtworkCard from "../components/UI/ArtworkCard/ArtworkCard";

const meta: Meta<typeof ArtworkCard> = {
  title: "Common/ArtworkCard",
  component: ArtworkCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "스페이스 메인 화면에서 2열 그리드로 작품 목록을 보여주는 카드 컴포넌트입니다. 상단에 72px 높이의 썸네일, 하단에 작품 제목(1줄, 초과 시 말줄임)과 작가명을 보여주며 카드 전체가 버튼으로 동작합니다. 이미지 URL이 없거나 로드에 실패하면 플레이스홀더 그래픽이 대신 표시됩니다. 작가명이 없으면(미입력) 해당 영역이 표시되지 않습니다.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    title: {
      description: "작품 제목",
      table: { type: { summary: "string" } },
    },
    authorName: {
      description: "작가명. 미전달 또는 빈 문자열이면 표시하지 않습니다.",
      table: { type: { summary: "string | undefined" } },
    },
    imageUrl: {
      description:
        "작품 이미지 URL. 미전달 또는 로드 실패 시 플레이스홀더 그래픽이 표시됩니다.",
      table: { type: { summary: "string | undefined" } },
    },
    onClick: {
      description: "카드 클릭 핸들러",
      table: { type: { summary: "() => void | undefined" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ArtworkCard>;

const defaultArgs = {
  title: "포게더 : 작가와 방문객이 연결되는 곳",
  authorName: "김여름",
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "이미지가 없어 플레이스홀더 그래픽이 표시되는 기본 카드입니다.",
      },
    },
  },
  args: defaultArgs,
  decorators: [
    (Story) => (
      <div style={{ width: 160 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithImage: Story = {
  parameters: {
    docs: {
      description: {
        story: "작품 이미지가 있는 카드입니다.",
      },
    },
  },
  args: {
    ...defaultArgs,
    imageUrl: "https://picsum.photos/seed/forgather-artwork/320/144",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 160 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutAuthorName: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "작가명을 입력하지 않아 작가명 영역이 표시되지 않는 케이스입니다.",
      },
    },
  },
  args: {
    title: defaultArgs.title,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 160 }}>
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
    ...defaultArgs,
    title:
      "매우 긴 작품 제목이 한 줄을 초과할 경우 나머지 텍스트는 말줄임 처리되어 화면에 표시됩니다",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 160 }}>
        <Story />
      </div>
    ),
  ],
};

export const ImageLoadError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "이미지 URL이 유효하지 않아 로드에 실패하는 경우로, 플레이스홀더 그래픽으로 대체됩니다.",
      },
    },
  },
  args: {
    ...defaultArgs,
    imageUrl: "https://invalid.example.com/not-found.png",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 160 }}>
        <Story />
      </div>
    ),
  ],
};

export const GridLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: "실제 페이지에서 사용되는 2열 그리드 레이아웃 예시입니다.",
      },
    },
    layout: "padded",
  },
  args: defaultArgs,
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 8,
        width: 328,
      }}
    >
      <ArtworkCard {...args} />
      <ArtworkCard {...args} title="두 번째 작품" authorName="박겨울" />
      <ArtworkCard {...args} title="세 번째 작품" />
      <ArtworkCard {...args} title="네 번째 작품" authorName="이가을" />
    </div>
  ),
};
