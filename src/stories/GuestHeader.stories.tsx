import type { Meta, StoryObj } from "@storybook/react-vite";
import GuestHeader from "@/components/@common/GuestHeader/GuestHeader";

const meta: Meta<typeof GuestHeader> = {
  title: "Common/GuestHeader",
  component: GuestHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "게스트(방문자) 화면 상단에 공통으로 노출되는 브랜드 헤더입니다. 로고와 '포게더 둘러보기' 링크로 구성됩니다.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof GuestHeader>;

export const Default: Story = {};
