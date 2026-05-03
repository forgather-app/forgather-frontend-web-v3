import type { Meta, StoryObj } from "@storybook/react-vite";
import GuestCard from "@/components/@common/guestCard/GuestCard";

const meta: Meta<typeof GuestCard> = {
  title: "UI/GuestCard",
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
          "- **iconType**: 헤더 우측 아이콘. `scrap`(스크랩), `menu`(숨김 메뉴), 미전달 시 없음.\n" +
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
    iconType: {
      control: { type: "select" },
      options: ["scrap", "menu"],
      description: "헤더 우측 아이콘 타입",
      table: { type: { summary: '"scrap" | "menu" | "none"' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof GuestCard>;

const defaultArgs = {
  author: "김이름",
  text: "졸업 전시 축하해요! 오랜 시간 동안 준비한 게 느껴지고 작품 하나하나에 정성이 담겨 있었어요.",
};

/** isNew: true — 뒷면 상태. 클릭하면 flip 애니메이션과 함께 앞면으로 전환됩니다. */
export const New: Story = {
  args: {
    ...defaultArgs,
    isNew: true,
    iconType: "scrap",
  },
};

/** 유저가 보는 일반 방명록. 스크랩 아이콘이 우측에 표시됩니다. */
export const UserView: Story = {
  args: {
    ...defaultArgs,
    isNew: false,
    iconType: "scrap",
  },
};

/** 유저가 보는 사진 첨부 방명록. 사진 아이콘(좌측)과 스크랩 아이콘(우측)이 표시됩니다. */
export const UserViewImage: Story = {
  args: {
    ...defaultArgs,
    isNew: false,
    isPhotoExist: true,
    iconType: "scrap",
  },
};

/** 유저가 보는 숨긴 방명록. 우측에 메뉴(⋮) 아이콘이 표시됩니다. */
export const HideView: Story = {
  args: {
    ...defaultArgs,
    isNew: false,
    iconType: "menu",
  },
};

/** 유저가 보는 사진 첨부 숨긴 방명록. 사진 아이콘(좌측)과 메뉴 아이콘(우측)이 표시됩니다. */
export const HideViewImage: Story = {
  args: {
    ...defaultArgs,
    isNew: false,
    isPhotoExist: true,
    iconType: "menu",
  },
};

/** 방문자가 보는 방명록. 헤더 아이콘 없음. */
export const GuestView: Story = {
  args: {
    ...defaultArgs,
    isNew: false,
  },
};

/** 방문자가 보는 사진 첨부 방명록. 좌측에 사진 아이콘만 표시됩니다. */
export const GuestViewImage: Story = {
  args: {
    ...defaultArgs,
    isNew: false,
    isPhotoExist: true,
  },
};

/** 내용이 길어 4줄 말줄임 처리가 되는 케이스입니다. */
export const LongText: Story = {
  args: {
    author: "아주아주긴이름을가진작성자",
    text: "졸업 전시 정말 축하해요! 오랜 시간 동안 준비한 게 느껴지고 작품 하나하나에 정성이 담겨 있었어요. 앞으로도 좋은 작품 많이 만들어주세요. 항상 응원하겠습니다!",
    isNew: false,
    iconType: "scrap",
  },
};
