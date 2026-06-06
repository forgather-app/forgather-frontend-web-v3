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
          "이미지 업로드용 클릭 영역 컴포넌트. 클릭 시 파일 선택창이 열립니다.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageInput>;

export const Default: Story = {};
