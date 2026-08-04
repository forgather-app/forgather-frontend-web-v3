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
          "스페이스 메인 화면에서 작품 목록을 보여주는 카드 컴포넌트입니다. 상단에 작품 제목(최대 2줄, 초과 시 말줄임), 하단에 작품 이미지가 표시됩니다. 이미지 URL이 없거나 로드에 실패하면 플레이스홀더 그래픽이 대신 표시됩니다.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    title: {
      description: "작품 제목",
      table: { type: { summary: "string" } },
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
  title:
    "작품 제목이 들어가는 곳입니다. 최대 2줄까지 작성 가능 이후 텍스트는 생략됩니다",
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
    imageUrl: "https://picsum.photos/seed/forgather-artwork/328/200",
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
    title:
      "매우 긴 작품 제목이 두 줄을 초과할 경우 나머지 텍스트는 말줄임 처리되어 화면에 표시됩니다",
  },
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
};
