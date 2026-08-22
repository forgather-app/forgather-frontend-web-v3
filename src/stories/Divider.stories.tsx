import type { Meta, StoryObj } from "@storybook/react-vite";
import Divider from "@/components/@common/Divider/Divider";

const meta: Meta<typeof Divider> = {
  title: "Common/Divider",
  component: Divider,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360, padding: "0 16px", background: "#1B1D1F" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "좌우 화면 끝까지 확장되는 풀블리드 구분선입니다. 색상과 두께를 외부에서 지정할 수 있습니다. 부모가 `overflow-y: auto` 스크롤 컨테이너라면, 해당 컨테이너에 상쇄용 음수 마진/패딩을 함께 적용해야 잘리지 않습니다.",
      },
    },
  },
  argTypes: {
    color: {
      control: { type: "color" },
      description: "구분선 색상",
    },
    height: {
      control: { type: "number" },
      description: "구분선 두께(px)",
    },
    marginTop: {
      control: { type: "number" },
      description: "구분선 위쪽 여백(px)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: { color: "rgba(17, 17, 17, 0.7)", height: 8, marginTop: 24 },
};

export const MyPageStyle: Story = {
  args: { color: "#252930", height: 12 },
};
