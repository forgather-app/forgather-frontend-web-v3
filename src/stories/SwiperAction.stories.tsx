import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
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
          "fill-it-frontend에서 이식한 드래그 기반 스와이프 캐러셀입니다. framer-motion 스프링 애니메이션으로 슬라이드 간 스냅 이동을 처리하며, 좌우 끝에는 스크린 리더/키보드 이용자를 위한 시각적으로 숨겨진 이전/다음 버튼(VisuallyHidden)이 렌더링됩니다. 슬라이드는 항상 좌측부터 정렬되며, 컨테이너 폭이 카드 폭보다 넓게 남는 만큼 다음 카드가 우측에 자연스럽게 peek됩니다(별도 peek 비율 설정 불필요). 실제 앱 레이아웃(Layout.Wrapper)과 동일하게 max-width를 theme.layout.maxWidth로 제한해 렌더링합니다.",
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
      description:
        "슬라이드 양옆에 보이게 할 여유 공간 비율(요소 너비 대비). activeIndex와 함께 쓰는 controlled 모드에서만 적용됩니다",
      table: { type: { summary: "number | undefined" } },
    },
    activeIndex: {
      description:
        "외부에서 현재 인덱스를 제어하고 싶을 때 전달 (예: 라우트 파라미터와 동기화). 전달 시 슬라이드가 컨테이너 전체 폭을 차지하는 controlled 모드로 전환됩니다",
      table: { type: { summary: "number | undefined" } },
    },
    onIndexChange: {
      description: "드래그/스냅으로 인덱스가 바뀔 때마다 호출됩니다",
      table: { type: { summary: "(index: number) => void" } },
    },
    fillHeight: {
      description:
        "true이면 스와이프 인식 영역(hit area)이 부모 컨테이너의 전체 높이를 채웁니다. 콘텐츠가 그보다 길면 콘텐츠 높이에 맞춰 자연스럽게 늘어납니다",
      table: { type: { summary: "boolean | undefined" } },
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
          "ArtworkCard 3개를 슬라이드로 전달한 기본 상태입니다. 첫 카드는 좌측에 붙어 시작하고, 우측으로 다음 카드가 살짝 보입니다. 좌우로 드래그하면 스프링 애니메이션과 함께 스냅 이동합니다.",
      },
    },
  },
  args: {
    swiperElement: artworkCards,
  },
};

const messageSlides = [
  <div key="1" style={{ padding: 24, color: theme.colors.gray.white }}>
    첫 번째 방명록 메시지입니다.
  </div>,
  <div key="2" style={{ padding: 24, color: theme.colors.gray.white }}>
    두 번째 방명록 메시지입니다. 내용이 조금 더 길어질 수도 있어요.
  </div>,
  <div key="3" style={{ padding: 24, color: theme.colors.gray.white }}>
    세 번째 방명록 메시지입니다.
  </div>,
];

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "activeIndex/onIndexChange를 전달한 controlled 모드입니다. 슬라이드가 컨테이너 전체 폭을 차지하며 가운데 정렬되고, 현재 슬라이드의 실제 높이에 맞춰 트랙 높이가 조절됩니다.",
      },
    },
  },
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <SwiperAction
        swiperElement={messageSlides}
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />
    );
  },
};

export const FillHeight: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "fillHeight를 전달한 controlled 모드입니다. 스와이프 인식 영역이 부모 컨테이너의 전체 높이(여기서는 400px)를 채워, 카드 콘텐츠 아래 빈 여백에서 드래그해도 슬라이드가 전환됩니다.",
      },
    },
  },
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ height: 400 }}>
        <SwiperAction
          swiperElement={messageSlides}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
          fillHeight
        />
      </div>
    );
  },
};
