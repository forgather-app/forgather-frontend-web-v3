import styled from "@emotion/styled";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CarouselLayout from "../shared/carousel/CarouselLayout";

const PlaceholderSlide = styled.div<{ bg?: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 120px;
  gap: 12px;
`;

const SlideTitle = styled.h1`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  white-space: pre-line;
`;

const SlideDesc = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

const IllustArea = styled.div`
  flex: 1;
  margin-top: 32px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
`;

const KakaoButton = styled.button`
  width: 100%;
  padding: 14px 16px;
  background-color: #ffe812;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  color: #1b1d1f;
  text-align: center;
`;

const meta: Meta<typeof CarouselLayout> = {
  title: "Shared/CarouselLayout",
  component: CarouselLayout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "좌우 스와이프로 페이지를 전환하는 캐러셀 레이아웃입니다.\n\n`children`으로 슬라이드 페이지들을 전달하고, `footer`로 하단 고정 영역을 추가할 수 있습니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "-16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CarouselLayout>;

export const TwoSlides: Story = {
  parameters: {
    docs: {
      description: { story: "2개의 슬라이드를 좌우 스와이프로 전환합니다." },
    },
  },
  render: () => (
    <CarouselLayout
      footer={
        <div style={{ padding: "12px 0" }}>
          <KakaoButton type="button">카카오로 로그인하기</KakaoButton>
        </div>
      }
    >
      <PlaceholderSlide>
        <SlideTitle>마음이 기록되는 곳,{"\n"}나만의 스페이스!</SlideTitle>
        <SlideDesc>
          스페이스를 만들고, 소중한 사람들을 초대해보세요.{"\n"}방명록을
          오래도록 모아서 볼 수 있어요.
        </SlideDesc>
        <IllustArea />
      </PlaceholderSlide>
      <PlaceholderSlide>
        <SlideTitle>우리 모두의 스페이스,{"\n"}그리고 하나의 전시</SlideTitle>
        <SlideDesc>
          다른 작가님들과 함께 전시를 열고 있나요?{"\n"}모두의 스페이스를 하나의
          전시로 연결해요!
        </SlideDesc>
        <IllustArea />
      </PlaceholderSlide>
    </CarouselLayout>
  ),
};

export const ThreeSlides: Story = {
  parameters: {
    docs: {
      description: {
        story: "슬라이드 수에 관계없이 dot 인디케이터가 자동 생성됩니다.",
      },
    },
  },
  render: () => (
    <CarouselLayout>
      <PlaceholderSlide>
        <SlideTitle>첫 번째 슬라이드</SlideTitle>
        <SlideDesc>왼쪽으로 스와이프하여 다음 페이지로 이동합니다.</SlideDesc>
        <IllustArea />
      </PlaceholderSlide>
      <PlaceholderSlide>
        <SlideTitle>두 번째 슬라이드</SlideTitle>
        <SlideDesc>어떤 페이지가 와도 좌우 스크롤이 구성됩니다.</SlideDesc>
        <IllustArea />
      </PlaceholderSlide>
      <PlaceholderSlide>
        <SlideTitle>세 번째 슬라이드</SlideTitle>
        <SlideDesc>마지막 슬라이드입니다.</SlideDesc>
        <IllustArea />
      </PlaceholderSlide>
    </CarouselLayout>
  ),
};
