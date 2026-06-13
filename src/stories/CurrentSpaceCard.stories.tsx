import type { Meta, StoryObj } from "@storybook/react-vite";
import CurrentSpaceCard from "@/components/@common/currentSpaceCard/CurrentSpaceCard";

const SAMPLE_THUMBNAIL =
  "https://www.figma.com/api/mcp/asset/5b6ede47-c742-452e-bdb8-e471b913615e";

const LINKED_EXHIBITION = {
  name: "포게더 시각 디자인 전시회",
  url: "https://forgather.app",
  period: {
    startDate: new Date("2026-02-08T00:00:00"),
    endDate: new Date("2026-02-10T00:00:00"),
  },
  location: "홍익대학교 OO관",
};

const meta: Meta<typeof CurrentSpaceCard> = {
  title: "UI/CurrentSpaceCard",
  component: CurrentSpaceCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 328 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "현재 선택된 공간과 연결 전시 정보를 보여주는 카드 컴포넌트입니다. 카드 전체, 상단 연결 전시 칩, 하단 관리 버튼은 각각 독립적인 클릭 인터랙션을 가집니다. 전시 관리 버튼은 연결된 전시가 있을 때만 표시됩니다.\n ⚠️ 하단 방명록, 작품관리, 전시관리 버튼의 active 컬러는 임의로 넣은 색상입니다. 검토가 필요합니다.",
      },
    },
  },
  argTypes: {
    spaceName: {
      description: "공간 이름",
      table: { type: { summary: "string" } },
    },
    thumbnailUrl: {
      description:
        "공간 썸네일 이미지 URL. 없으면 기본 다크 배경이 표시됩니다.",
      table: { type: { summary: "string" } },
    },
    linkedExhibition: {
      description:
        "연결된 전시 정보. 없으면 상단 칩과 전시 메타 정보가 표시되지 않습니다.",
      control: false,
      table: { type: { summary: "ExhibitionInfoType" } },
    },
    onCardClick: {
      description: "카드 전체 클릭 핸들러",
      control: false,
      table: { type: { summary: "() => void" } },
    },
    onLinkedExhibitionClick: {
      description: "상단 연결 전시 칩 클릭 핸들러",
      control: false,
      table: { type: { summary: "(exhibition: ExhibitionInfoType) => void" } },
    },
    onGuestBookClick: {
      description: "방명록 버튼 클릭 핸들러",
      control: false,
      table: { type: { summary: "() => void" } },
    },
    onArtworkManageClick: {
      description: "작품 관리 버튼 클릭 핸들러",
      control: false,
      table: { type: { summary: "() => void" } },
    },
    onExhibitionManageClick: {
      description: "전시 관리 버튼 클릭 핸들러",
      control: false,
      table: { type: { summary: "() => void" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CurrentSpaceCard>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Figma 기본 디자인에 맞춘 상태입니다. 카드, 상단 칩, 하단 3개 버튼 클릭 시 서로 다른 console.log가 출력됩니다.",
      },
    },
  },
  args: {
    spaceName: "포게더 : 작가와 방문객이 연결되는 곳",
    thumbnailUrl: SAMPLE_THUMBNAIL,
    linkedExhibition: LINKED_EXHIBITION,
    onCardClick: () => console.log("CurrentSpaceCard: card clicked"),
    onLinkedExhibitionClick: (exhibition) =>
      console.log(
        "CurrentSpaceCard: linked exhibition clicked",
        exhibition.url,
      ),
    onGuestBookClick: () => console.log("CurrentSpaceCard: guest book clicked"),
    onArtworkManageClick: () =>
      console.log("CurrentSpaceCard: artwork manage clicked"),
    onExhibitionManageClick: () =>
      console.log("CurrentSpaceCard: exhibition manage clicked"),
  },
};

export const LongContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "공간명, 전시명, 장소가 길어질 때 말줄임 처리가 적용되는 상태입니다.",
      },
    },
  },
  args: {
    ...Default.args,
    spaceName: "포게더 : 작가와 방문객이 연결되는 아주 긴 이름의 복합문화공간",
    linkedExhibition: {
      ...LINKED_EXHIBITION,
      name: "포게더 시각 디자인 전시회 그리고 연결의 미래를 탐색하는 긴 전시명",
      location: "홍익대학교 서울캠퍼스 제1전시관 아주 긴 장소명",
    },
  },
};

export const WithoutLinkedExhibition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "연결된 전시가 없을 때 상단 칩, 전시 기간·장소 메타 정보, 전시 관리 버튼이 생략되는 상태입니다.",
      },
    },
  },
  args: {
    ...Default.args,
    linkedExhibition: undefined,
  },
};

export const WithoutThumbnail: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "썸네일 이미지가 없을 때 기본 다크 배경으로 렌더링되는 상태입니다.",
      },
    },
  },
  args: {
    ...Default.args,
    thumbnailUrl: undefined,
  },
};
