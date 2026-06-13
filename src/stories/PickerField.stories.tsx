import type { Meta, StoryObj } from "@storybook/react-vite";
import PickerField from "@/components/@common/pickerField/PickerField";

const meta: Meta<typeof PickerField> = {
  title: "Common/PickerField",
  component: PickerField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "옵션 선택 트리거 버튼 컴포넌트. 클릭 시 BottomSheet 등 선택 UI를 여는 용도로 사용합니다. 값이 없으면 placeholder를, 있으면 선택된 값을 표시합니다.",
      },
    },
  },
  argTypes: {
    value: {
      description: "선택된 값. 없으면 placeholder 표시",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      description: "값이 없을 때 표시되는 텍스트",
      table: { type: { summary: "string" } },
    },
    onClick: {
      description: "클릭 핸들러 (BottomSheet 열기 등)",
      table: { type: { summary: "() => void" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PickerField>;

export const Placeholder: Story = {
  parameters: {
    docs: {
      description: { story: "값이 선택되지 않은 초기 상태." },
    },
  },
  args: {
    placeholder: "날짜를 선택해주세요",
  },
};

export const Selected: Story = {
  parameters: {
    docs: {
      description: { story: "값이 선택된 상태." },
    },
  },
  args: {
    value: "2025.06.13 ~ 2025.06.20",
    placeholder: "날짜를 선택해주세요",
  },
};
