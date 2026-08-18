import type { Meta, StoryObj } from "@storybook/react-vite";
import PrivateGuestBookOverlay from "@/pages/guestGuestBook/components/privateGuestBookOverlay/PrivateGuestBookOverlay";

const meta: Meta<typeof PrivateGuestBookOverlay> = {
  title: "Guest/PrivateGuestBookOverlay",
  component: PrivateGuestBookOverlay,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          width: 328,
          height: 240,
          background: "#252930",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "방명록이 공개되지 않은 스페이스에서 게스트 방명록 목록 위에 겹쳐 보여주는 잠금 안내입니다. " +
          "실제 사용 시에는 블러 처리된 목록 위에 절대 위치로 겹쳐집니다.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PrivateGuestBookOverlay>;

export const Default: Story = {};
