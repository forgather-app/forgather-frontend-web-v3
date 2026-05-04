import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import GuestDisplayCard from "@/components/@common/guestDisplayCard/GuestDisplayCard";

const meta: Meta<typeof GuestDisplayCard> = {
  title: "UI/GuestDisplayCard",
  component: GuestDisplayCard,
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
          "방명록 상세 카드 컴포넌트입니다.\n\n" +
          "### displayType\n" +
          "- **owner**: 자신의 방명록. `interaction`으로 스크랩·메뉴 핸들러를 전달합니다.\n" +
          "- **visitor**: 타인의 방명록. 읽기 전용이며 `interaction`을 받지 않습니다.\n\n" +
          "### isNew\n" +
          "- **true**: 로고·작성자·날짜가 보이는 teaser face로 시작합니다. 클릭하면 cardFlip 애니메이션 후 content face로 전환됩니다.\n" +
          "- **false**: content face를 바로 렌더링합니다.\n\n" +
          "### photoSrcArray\n" +
          "사진이 1장 이상이면 카드 상단에 대표 사진이 표시되고, 2장 이상이면 `+N 장` 배지가 표시됩니다.",
      },
    },
  },
  argTypes: {
    displayType: {
      control: { type: "select" },
      options: ["owner", "visitor"],
      description:
        "카드 뷰 타입. owner는 interaction이 필요하고, visitor는 읽기 전용입니다.",
      table: { type: { summary: '"owner" | "visitor"' } },
    },
    author: {
      description: "방명록 작성자 이름",
      table: { type: { summary: "string" } },
    },
    text: {
      description: "방명록 본문 내용",
      table: { type: { summary: "string" } },
    },
    createdAt: {
      description: "방명록 작성 일자",
      control: { type: "date" },
      table: { type: { summary: "Date" } },
    },
    isNew: {
      control: { type: "boolean" },
      description: "새로운 방명록 여부. true이면 teaser face에서 시작합니다.",
      table: { type: { summary: "boolean" } },
    },
    photoSrcArray: {
      description:
        "방명록 사진 URL 배열. 비어 있으면 사진 영역이 렌더링되지 않습니다.",
      table: { type: { summary: "string[]" } },
    },
    interaction: {
      control: false,
      description:
        "owner일 때만 유효. `{ isScrapped, toggleScrap, onMenuClick }`을 포함합니다. OwnerDefault / OwnerScrapped 스토리에서 확인하세요.",
      table: {
        type: {
          summary:
            "{ isScrapped: boolean; toggleScrap: () => void; onMenuClick: () => void }",
        },
        category: "owner only",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof GuestDisplayCard>;

const COMMON = {
  author: "현주짱짱이",
  text: "그동안 고생 많았어! 작업 멋지다. 언제든 연락해 밥 한 번 살게~!",
  createdAt: new Date("2026-02-03T16:42:00"),
  isNew: false as boolean,
  photoSrcArray: undefined as string[] | undefined,
};

const SAMPLE_PHOTOS = [
  "https://picsum.photos/seed/forgather1/328/140",
  "https://picsum.photos/seed/forgather2/328/140",
  "https://picsum.photos/seed/forgather3/328/140",
];

// ─── Owner ──────────────────────────────────────────────────────────────────

/** owner — 미스크랩 상태. 아이콘 클릭으로 스크랩 토글이 가능합니다. */
export const OwnerDefault: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "소유자 뷰 기본 상태 (isScrapped: false). 스크랩 아이콘을 클릭하면 스크랩 상태로 전환됩니다.",
      },
    },
  },
  render: ({ author, text, createdAt, isNew, photoSrcArray }) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestDisplayCard
        displayType="owner"
        author={author ?? COMMON.author}
        text={text ?? COMMON.text}
        createdAt={createdAt ?? COMMON.createdAt}
        isNew={isNew ?? false}
        photoSrcArray={photoSrcArray}
        interaction={{
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
          onMenuClick: () => alert("메뉴 클릭"),
        }}
      />
    );
  },
  args: COMMON,
};

/** owner — 스크랩된 상태. 스크랩 아이콘이 활성화된 초기 상태를 보여줍니다. */
export const OwnerScrapped: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "소유자 뷰 스크랩 상태 (isScrapped: true). 스크랩 아이콘이 활성화된 채로 시작합니다.",
      },
    },
  },
  render: ({ author, text, createdAt, isNew, photoSrcArray }) => {
    const [isScrapped, setIsScrapped] = useState(true);
    return (
      <GuestDisplayCard
        displayType="owner"
        author={author ?? COMMON.author}
        text={text ?? COMMON.text}
        createdAt={createdAt ?? COMMON.createdAt}
        isNew={isNew ?? false}
        photoSrcArray={photoSrcArray}
        interaction={{
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
          onMenuClick: () => alert("메뉴 클릭"),
        }}
      />
    );
  },
  args: COMMON,
};

/** owner — 새 방명록. teaser face에서 시작해 클릭 시 flip됩니다. */
export const OwnerNew: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "소유자 뷰이고 isNew: true인 상태. 클릭하면 flip 후 스크랩·메뉴가 있는 content face가 표시됩니다.",
      },
    },
  },
  render: ({ author, text, createdAt, photoSrcArray }) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestDisplayCard
        displayType="owner"
        author={author ?? COMMON.author}
        text={text ?? COMMON.text}
        createdAt={createdAt ?? COMMON.createdAt}
        isNew
        photoSrcArray={photoSrcArray}
        interaction={{
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
          onMenuClick: () => alert("메뉴 클릭"),
        }}
      />
    );
  },
  args: COMMON,
};

/** owner — 새 방명록. teaser face에서 시작해 클릭 시 flip됩니다. */
export const OwnerNewLongName: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "소유자 뷰이고 isNew: true인 상태. Author의 이름이 길 경우 표시되는 UI",
      },
    },
  },
  render: ({ text, createdAt, photoSrcArray }) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestDisplayCard
        displayType="owner"
        author={`${COMMON.author}asdfasdfasdfasdfasdfasd`}
        text={text ?? COMMON.text}
        createdAt={createdAt ?? COMMON.createdAt}
        isNew
        photoSrcArray={photoSrcArray}
        interaction={{
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
          onMenuClick: () => alert("메뉴 클릭"),
        }}
      />
    );
  },
  args: COMMON,
};

/** owner — 사진 1장. 대표 사진이 카드 상단에 표시됩니다. */
export const OwnerWithSinglePhoto: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "소유자 뷰이고 사진이 1장인 경우. 대표 사진이 표시되고 추가 장수 배지는 보이지 않습니다.",
      },
    },
  },
  render: ({ author, text, createdAt, isNew, photoSrcArray }) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestDisplayCard
        displayType="owner"
        author={author ?? COMMON.author}
        text={text ?? COMMON.text}
        createdAt={createdAt ?? COMMON.createdAt}
        isNew={isNew ?? false}
        photoSrcArray={photoSrcArray}
        interaction={{
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
          onMenuClick: () => alert("메뉴 클릭"),
        }}
      />
    );
  },
  args: { ...COMMON, photoSrcArray: [SAMPLE_PHOTOS[0]] },
};

/** owner — 사진 3장. 대표 사진과 `+2 장` 배지가 함께 표시됩니다. */
export const OwnerWithMultiplePhotos: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "소유자 뷰이고 사진이 여러 장인 경우. 첫 번째 사진이 대표 이미지로 표시되고 나머지 장수 배지가 표시됩니다.",
      },
    },
  },
  render: ({ author, text, createdAt, isNew, photoSrcArray }) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestDisplayCard
        displayType="owner"
        author={author ?? COMMON.author}
        text={text ?? COMMON.text}
        createdAt={createdAt ?? COMMON.createdAt}
        isNew={isNew ?? false}
        photoSrcArray={photoSrcArray}
        interaction={{
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
          onMenuClick: () => alert("메뉴 클릭"),
        }}
      />
    );
  },
  args: { ...COMMON, photoSrcArray: SAMPLE_PHOTOS },
};

// ─── Visitor ─────────────────────────────────────────────────────────────────

/** visitor — 기본. 아이콘 없이 읽기 전용으로 표시됩니다. */
export const VisitorDefault: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "방문자 뷰 기본 상태. 스크랩·메뉴 없이 작성자·날짜·본문만 표시됩니다.",
      },
    },
  },
  args: { ...COMMON, displayType: "visitor" },
};

/** visitor — 새 방명록. teaser face에서 시작해 클릭 시 읽기 전용 content face로 전환됩니다. */
export const VisitorNew: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "방문자 뷰이고 isNew: true인 상태. 클릭하면 flip 후 읽기 전용 content face가 표시됩니다.",
      },
    },
  },
  args: { ...COMMON, displayType: "visitor", isNew: true },
};

/** visitor — 사진 3장. 읽기 전용으로 사진이 표시됩니다. */
export const VisitorWithPhotos: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "방문자 뷰이고 사진이 여러 장인 경우. 읽기 전용으로 대표 사진과 나머지 장수 배지가 표시됩니다.",
      },
    },
  },
  args: { ...COMMON, displayType: "visitor", photoSrcArray: SAMPLE_PHOTOS },
};

// ─── Edge case ───────────────────────────────────────────────────────────────

/** 본문이 길어 max-height 286px 클리핑이 적용되는 케이스 */
export const OwnerLongText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "본문이 아주 긴 경우. max-height 286px 제한으로 텍스트가 클리핑됩니다.",
      },
    },
  },
  render: ({ author, text, createdAt, isNew, photoSrcArray }) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestDisplayCard
        displayType="owner"
        author={author ?? COMMON.author}
        text={text ?? COMMON.text}
        createdAt={createdAt ?? COMMON.createdAt}
        isNew={isNew ?? false}
        photoSrcArray={photoSrcArray}
        interaction={{
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
          onMenuClick: () => alert("메뉴 클릭"),
        }}
      />
    );
  },
  args: {
    ...COMMON,
    text: "그동안 정말 고생 많았어! 4년 동안 이 작업을 꾸준히 해온 게 정말 대단해. 졸업 전시를 보면서 너의 성장을 느낄 수 있었고, 작품 하나하나에 담긴 열정과 노력이 고스란히 느껴졌어. 언제나 응원하고 있을게. 앞으로도 좋은 작품 많이 만들어줘! 밥 한 번 꼭 먹자~ 연락해! 그동안 정말 고생 많았어! 4년 동안 이 작업을 꾸준히 해온 게 정말 대단해.그동안 정말 고생 많았어! 4년 동안 이 작업을 꾸준히 해온 게 정말 대단해. 졸업 전시를 보면서 너의 성장을 느낄 수 있었고, 작품 하나하나에 담긴 열정과 노력이 고스란히 느껴졌어. 언제나 응원하고 있을게. 앞으로도 좋은 작품 많이 만들어줘! 밥 한 번 꼭 먹자~ 연락해! 그동안 정말 고생 많았어! 4년 동안 이 작업을 꾸준히 해온 게 정말 대단해.",
  },
};

/** 작성자 이름이 길어 text-overflow 처리되는 케이스 */
export const OwnerLongAuthorName: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "작성자 이름이 카드 너비를 초과하는 경우. text-overflow: ellipsis로 클리핑됩니다.",
      },
    },
  },
  render: ({ author, text, createdAt, isNew, photoSrcArray }) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestDisplayCard
        displayType="owner"
        author={author ?? COMMON.author}
        text={text ?? COMMON.text}
        createdAt={createdAt ?? COMMON.createdAt}
        isNew={isNew ?? false}
        photoSrcArray={photoSrcArray}
        interaction={{
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
          onMenuClick: () => alert("메뉴 클릭"),
        }}
      />
    );
  },
  args: {
    ...COMMON,
    author: "너무너무너무너무너무너무너무긴이름",
  },
};
