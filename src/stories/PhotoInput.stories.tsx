import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import IcCamera from "@/assets/icons/ic_camera.svg?react";
import IcPhoto from "@/assets/icons/ic_photo.svg?react";
import PhotoInput from "@/components/@common/photoInput/PhotoInput";

const meta: Meta<typeof PhotoInput> = {
  title: "Common/PhotoInput",
  component: PhotoInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "여러 장의 사진을 선택·삭제할 수 있는 사진 입력 컴포넌트입니다. `maxCount`에 도달하면 추가 버튼이 사라집니다. " +
          "추가 버튼에 표시할 아이콘은 `icon` prop으로 페이지마다 다르게 지정할 수 있습니다. `showCoverBadge`가 true인 경우에만 " +
          "첫 번째 사진에 '대표 사진' 배지가 표시됩니다(예: 작품 등록). 방명록 작성처럼 대표 사진 개념이 없는 곳에서는 false(기본값)로 둡니다.",
      },
    },
  },
  argTypes: {
    photos: {
      description: "선택된 사진 목록.",
      table: { type: { summary: "File[]" } },
    },
    maxCount: {
      description: "최대 선택 가능 장수. 도달 시 추가 버튼이 숨겨집니다.",
      table: { type: { summary: "number" } },
    },
    onChange: {
      description: "사진 목록 변경 시 호출됩니다.",
      table: { type: { summary: "(photos: File[]) => void" } },
    },
    icon: {
      description: "추가 버튼에 표시할 아이콘 (24×24 SVG 권장)",
      table: { type: { summary: "ReactElement<SVGProps<SVGSVGElement>>" } },
    },
    showCoverBadge: {
      description:
        "첫 번째 사진에 '대표 사진' 배지 표시 여부. 대표 사진 개념이 있는 작품 등록에서만 true로 설정합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PhotoInput>;

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "실제 파일을 선택해 사진을 추가·삭제해볼 수 있는 컨트롤드 컴포넌트 예시입니다. 대표 사진 배지가 없는 기본 형태(예: 방명록 작성)입니다.",
      },
    },
  },
  args: {
    maxCount: 5,
    icon: <IcCamera aria-hidden="true" width={24} height={24} fill="none" />,
    addButtonAriaLabel: "사진 추가",
    listAriaLabel: "첨부한 사진",
  },
  render: (args) => {
    const [photos, setPhotos] = useState<File[]>([]);
    return <PhotoInput {...args} photos={photos} onChange={setPhotos} />;
  },
};

export const WithCoverBadge: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "첫 번째 사진에 '대표 사진' 배지가 표시되는 예시입니다. 작품 등록처럼 대표 사진 개념이 있는 화면에서 사용합니다.",
      },
    },
  },
  args: {
    maxCount: 10,
    icon: <IcPhoto aria-hidden="true" width={24} height={24} />,
    showCoverBadge: true,
    addButtonAriaLabel: "작품 사진 추가",
    listAriaLabel: "첨부한 작품 사진",
  },
  render: (args) => {
    const [photos, setPhotos] = useState<File[]>([]);
    return <PhotoInput {...args} photos={photos} onChange={setPhotos} />;
  },
};
