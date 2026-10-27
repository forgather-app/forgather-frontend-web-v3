import type { Meta, StoryObj } from "@storybook/react-vite";
import ExhibitionLocationDetail from "../components/@common/ExhibitionLocationDetail/ExhibitionLocationDetail";

const meta: Meta<typeof ExhibitionLocationDetail> = {
  title: "Common/ExhibitionLocationDetail",
  component: ExhibitionLocationDetail,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "전시 장소를 읽기 전용으로 보여주는 행입니다. placeName과 placeUrl이 모두 있으면 카카오맵 링크가 함께 표시되고, placeName과 emptyMessage가 모두 없으면 아무것도 렌더링하지 않습니다.",
      },
    },
  },
  argTypes: {
    placeName: {
      description: "표시할 장소명",
    },
    placeUrl: {
      description:
        "연결된 카카오맵 URL — placeName과 함께 있어야 링크가 표시됩니다",
    },
    emptyMessage: {
      description: "placeName이 없을 때 대신 표시할 안내 문구",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ExhibitionLocationDetail>;

export const WithMapLink: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "장소명과 카카오맵 URL이 모두 있어 '카카오맵으로 열기' 링크가 표시됩니다.",
      },
    },
  },
  args: {
    placeName: "홍익대학교 홍문관 4층",
    placeUrl: "https://place.map.kakao.com/123456",
  },
};

export const NameOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "카카오맵 연결 없이 장소명만 있는 상태입니다.",
      },
    },
  },
  args: {
    placeName: "홍익대학교 홍문관 4층",
  },
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: "장소명이 없을 때 emptyMessage가 대신 표시됩니다.",
      },
    },
  },
  args: {
    emptyMessage: "등록된 전시 장소가 없습니다.",
  },
};
