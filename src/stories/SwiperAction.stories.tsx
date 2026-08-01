import type { Meta, StoryObj } from "@storybook/react-vite";
import ArtworkCard from "../components/UI/ArtworkCard/ArtworkCard";
import SwiperAction from "../components/UI/SwiperAction/SwiperAction";
import { theme } from "../styles/theme";

const meta: Meta<typeof SwiperAction> = {
  title: "UI/SwiperAction",
  component: SwiperAction,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: theme.layout.maxWidth,
          width: "100%",
          margin: "0 auto",
          backgroundColor: theme.colors.gray.gray700,
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "fill-it-frontend에서 이식한 드래그 기반 스와이프 캐러셀입니다. framer-motion 스프링 애니메이션으로 슬라이드 간 스냅 이동을 처리하며, 좌우 끝에는 스크린 리더/키보드 이용자를 위한 시각적으로 숨겨진 이전/다음 버튼(VisuallyHidden)이 렌더링됩니다. 아직 이 프로젝트의 디자인(좌측 정렬 + 우측 peek)에 맞게 조정되지 않은 원본 그대로의 버전입니다. 실제 앱 레이아웃(Layout.Wrapper)과 동일하게 max-width를 theme.layout.maxWidth로 제한해 렌더링합니다.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    swiperElement: {
      description: "슬라이드로 전달되는 요소 리스트",
      table: { type: { summary: "React.ReactNode[]" } },
    },
    sidePeekRatio: {
      description: "슬라이드 양옆에 보이게 할 여유 공간 비율(요소 너비 대비)",
      table: { type: { summary: "number | undefined" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SwiperAction>;

const artworkCards = [
  <ArtworkCard
    key="1"
    title="작품 제목 하나. 최대 2줄까지 작성 가능 이후 텍스트는 생략됩니다"
  />,
  <ArtworkCard
    key="2"
    title="작품 제목 둘"
    imageUrl="https://picsum.photos/seed/forgather-artwork-2/328/200"
  />,
  <ArtworkCard
    key="3"
    title="작품 제목 셋"
    imageUrl="https://picsum.photos/seed/forgather-artwork-3/328/200"
  />,
];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "ArtworkCard 3개를 슬라이드로 전달한 기본 상태입니다. 좌우로 드래그하면 스프링 애니메이션과 함께 스냅 이동합니다.",
      },
    },
  },
  args: {
    swiperElement: artworkCards,
  },
};

export const WithSidePeek: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "sidePeekRatio를 지정해 현재 슬라이드 양옆으로 다음/이전 슬라이드가 살짝 보이도록 한 상태입니다.",
      },
    },
  },
  args: {
    swiperElement: artworkCards,
    sidePeekRatio: 0.08,
  },
};
