import type { Meta, StoryObj } from "@storybook/react-vite";
import ImageInput from "@/components/@common/imageInput/ImageInput";

const meta: Meta<typeof ImageInput> = {
  title: "Common/ImageInput",
  component: ImageInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "이미지 업로드용 클릭 영역 컴포넌트. 클릭 시 RN 앱의 네이티브 갤러리 피커가 열립니다(앱 웹뷰 전용, 순수 브라우저에서는 안내 스낵바만 표시). 이미지 선택 후 미리보기를 표시하려면 previewImage에 object URL을 전달하세요.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageInput>;

export const Default: Story = {
  args: {
    previewImage: null,
  },
};

export const WithPreview: Story = {
  parameters: {
    docs: {
      description: { story: "이미지 선택 후 미리보기 상태." },
    },
  },
  args: {
    previewImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
  },
};
