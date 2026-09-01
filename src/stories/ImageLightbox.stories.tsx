import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ImageLightbox from "../components/UI/ImageLightbox/ImageLightbox";
import { theme } from "../styles/theme";

const DUMMY_IMAGES = [
  {
    url: "https://picsum.photos/seed/forgather-1/720/720",
    name: "photo-1.jpg",
  },
  {
    url: "https://picsum.photos/seed/forgather-2/720/720",
    name: "photo-2.jpg",
  },
  {
    url: "https://picsum.photos/seed/forgather-3/720/720",
    name: "photo-3.jpg",
  },
  {
    url: "https://picsum.photos/seed/forgather-4/720/720",
    name: "photo-4.jpg",
  },
  {
    url: "https://picsum.photos/seed/forgather-5/720/720",
    name: "photo-5.jpg",
  },
];

const meta: Meta<typeof ImageLightbox> = {
  title: "UI/ImageLightbox",
  component: ImageLightbox,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "방명록 상세 페이지에서 첨부 이미지를 클릭했을 때 뜨는 전체 이미지 보기 라이트박스입니다.\n\n" +
          "`Modal`(+`Modal.Overlay`)로 전체 화면을 덮고, `SwiperAction`으로 좌우 스와이프 이미지 전환을 구현합니다. 이미지는 좌우 16px 여백 안에서 1:1 비율로 최대 채워 표시됩니다.\n\n" +
          "다운로드 아이콘·모두 저장하기 버튼은 `useSaveImageBridge`로 RN 앱에 저장을 요청합니다. 앱(웹뷰) 밖에서는 안내 스낵바만 표시됩니다.",
      },
    },
  },
  argTypes: {
    isOpen: { description: "라이트박스 열림 여부" },
    onClose: { description: "닫기(X) 버튼 · 배경 클릭 시 호출되는 콜백" },
    images: { description: "전체보기할 이미지 목록 (url, name)" },
    allowSave: {
      description:
        "이미지 저장(다운로드·모두 저장하기) 기능 노출 여부 (기본값 true)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageLightbox>;

const triggerButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "10px 20px",
  backgroundColor: theme.colors.main.purple,
  color: theme.colors.gray.white,
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontFamily: "SUIT, sans-serif",
  fontSize: 14,
};

const DefaultStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        backgroundColor: theme.colors.gray.gray700,
      }}
    >
      <button
        type="button"
        style={triggerButtonStyle}
        onClick={() => setIsOpen(true)}
      >
        이미지 라이트박스 열기
      </button>
      <ImageLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={DUMMY_IMAGES}
      />
    </div>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "5장의 이미지를 좌우로 스와이프하며 탐색합니다. 닫기(X) 버튼 또는 배경 클릭으로 닫을 수 있습니다.",
      },
    },
  },
  render: () => <DefaultStory />,
};

const SinglePhotoStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        backgroundColor: theme.colors.gray.gray700,
      }}
    >
      <button
        type="button"
        style={triggerButtonStyle}
        onClick={() => setIsOpen(true)}
      >
        이미지 라이트박스 열기
      </button>
      <ImageLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={[DUMMY_IMAGES[0]]}
      />
    </div>
  );
};

export const SinglePhoto: Story = {
  parameters: {
    docs: {
      description: {
        story: "이미지가 1장뿐인 경우 dot 인디케이터도 1개만 표시됩니다.",
      },
    },
  },
  render: () => <SinglePhotoStory />,
};

const GuestStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        backgroundColor: theme.colors.gray.gray700,
      }}
    >
      <button
        type="button"
        style={triggerButtonStyle}
        onClick={() => setIsOpen(true)}
      >
        이미지 라이트박스 열기
      </button>
      <ImageLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={DUMMY_IMAGES}
        allowSave={false}
      />
    </div>
  );
};

export const GuestNoSave: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "게스트뷰에서는 `allowSave={false}`로 다운로드 아이콘과 모두 저장하기 버튼을 숨깁니다. 게스트는 이미지를 저장할 수 없습니다.",
      },
    },
  },
  render: () => <GuestStory />,
};
