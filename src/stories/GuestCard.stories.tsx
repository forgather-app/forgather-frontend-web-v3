import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import GuestCard from "@/components/@common/GuestCard/GuestCard";

const meta: Meta<typeof GuestCard> = {
  title: "Common/GuestCard",
  component: GuestCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "방명록 카드 컴포넌트입니다.\n\n" +
          "- **isNew: true**: 뒷면(그라디언트 보더 + 로고)으로 시작. 클릭 시 flip 애니메이션 후 앞면으로 전환됩니다.\n" +
          "- **isNew: false**: 앞면을 바로 렌더링합니다. flip 구조 없음.\n" +
          "- **headerType**: 헤더 우측 아이콘 종류(`iconType`)와 클릭 핸들러를 포함합니다.\n" +
          "- **isPhotoExist**: `true`이면 헤더 좌측에 사진 아이콘이 표시됩니다.",
      },
    },
  },
  argTypes: {
    author: {
      description: "방명록 작성자 이름",
      table: { type: { summary: "string" } },
    },
    text: {
      description: "방명록 내용",
      table: { type: { summary: "string" } },
    },
    isNew: {
      control: { type: "boolean" },
      description:
        "새로운 방명록 여부. true이면 뒷면(flip 가능 상태)으로 시작합니다.",
      table: { type: { summary: "boolean" } },
    },
    isPhotoExist: {
      control: { type: "boolean" },
      description:
        "사진 첨부 여부. true이면 헤더 좌측에 사진 아이콘이 표시됩니다.",
      table: { type: { summary: "boolean" } },
    },
    headerType: {
      description: "헤더 우측 아이콘 타입 및 클릭 핸들러",
      table: {
        type: {
          summary:
            "{ iconType: 'scrap'; isScrapped: boolean; toggleScrap: () => void } | { iconType: 'menu'; onMenuClick: () => void }",
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof GuestCard>;

const defaultArgs = {
  author: "김이름",
  text: "졸업 전시 축하해요! 오랜 시간 동안 준비한 게 느껴지고 작품 하나하나에 정성이 담겨 있었어요.",
};

/** isNew: true — 새 방명록 스택 카드. 여러 장이 겹친 UI로 표시되며 클릭 시 개별 View로 이동합니다. */
export const New: Story = {
  args: { ...defaultArgs, isNew: true, onClick: () => alert("방명록 열기") },
};

/** 유저가 보는 일반 방명록 — 스크랩 토글 가능 */
export const UserView: Story = {
  render: (args) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestCard
        {...args}
        headerType={{
          iconType: "scrap",
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
        }}
      />
    );
  },
  args: { ...defaultArgs, isNew: false },
};

/** 유저가 보는 사진 첨부 방명록 — 스크랩 토글 가능 */
export const UserViewImage: Story = {
  render: (args) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestCard
        {...args}
        headerType={{
          iconType: "scrap",
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
        }}
      />
    );
  },
  args: { ...defaultArgs, isNew: false, isPhotoExist: true },
};

/** 유저가 보는 숨긴 방명록 — 메뉴 아이콘 */
export const HideView: Story = {
  args: {
    ...defaultArgs,
    isNew: false,
    headerType: { iconType: "menu", onMenuClick: () => alert("메뉴 클릭") },
  },
};

/** 유저가 보는 사진 첨부 숨긴 방명록 — 메뉴 아이콘 */
export const HideViewImage: Story = {
  args: {
    ...defaultArgs,
    isNew: false,
    isPhotoExist: true,
    headerType: { iconType: "menu", onMenuClick: () => alert("메뉴 클릭") },
  },
};

/** 내용이 길어 4줄 말줄임 처리가 되는 케이스 */
export const LongText: Story = {
  render: (args) => {
    const [isScrapped, setIsScrapped] = useState(false);
    return (
      <GuestCard
        {...args}
        headerType={{
          iconType: "scrap",
          isScrapped,
          toggleScrap: () => setIsScrapped((prev) => !prev),
        }}
      />
    );
  },
  args: {
    author: "아주아주긴이름을가진작성자",
    text: "졸업 전시 정말 축하해요! 오랜 시간 동안 준비한 게 느껴지고 작품 하나하나에 정성이 담겨 있었어요. 앞으로도 좋은 작품 많이 만들어주세요. 항상 응원하겠습니다!",
    isNew: false,
  },
};
