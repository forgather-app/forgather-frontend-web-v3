import type { Meta, StoryObj } from "@storybook/react-vite";
import ProfileImage from "@/components/@common/ProfileImage/ProfileImage";

const meta: Meta<typeof ProfileImage> = {
  title: "Common/ProfileImage",
  component: ProfileImage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: "#1B1D1F" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "원형 프로필 이미지입니다. `src`가 없거나 이미지 로드에 실패하면 기본 프로필 이미지(`profile.svg`)를 노출합니다.",
      },
    },
  },
  argTypes: {
    src: { control: { type: "text" }, description: "프로필 이미지 URL" },
    size: { control: { type: "number" }, description: "이미지 지름(px)" },
    alt: { control: { type: "text" }, description: "대체 텍스트" },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileImage>;

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    size: 40,
  },
};

export const NoImage: Story = {
  args: { src: "", size: 40 },
};

export const LoadError: Story = {
  args: { src: "https://example.com/not-found.png", size: 40 },
};

export const Large: Story = {
  args: { src: "", size: 80 },
};
