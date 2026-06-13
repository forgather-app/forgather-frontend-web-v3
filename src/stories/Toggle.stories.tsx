import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import Toggle from "../components/@common/toggle/Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Common/Toggle",
  component: Toggle,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1B1D1F" }],
    },
    docs: {
      description: {
        component:
          "on/off 두 상태를 전환하는 토글 컴포넌트입니다. `checked` + `onChange`로 외부에서 상태를 제어합니다.",
      },
    },
  },
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

const controlledRender = (args: React.ComponentProps<typeof Toggle>) => {
  const [{ checked }, setArgs] = useArgs<typeof args>();
  return (
    <Toggle
      {...args}
      checked={checked}
      onChange={(next) => {
        setArgs({ checked: next });
        args.onChange?.(next);
      }}
    />
  );
};

export const On: Story = {
  name: "활성 상태",
  parameters: {
    docs: { description: { story: "토글이 켜진 상태입니다." } },
  },
  render: controlledRender,
  args: {
    checked: true,
    label: "전체 공개",
  },
};

export const Off: Story = {
  name: "비활성 상태",
  parameters: {
    docs: { description: { story: "토글이 꺼진 상태입니다." } },
  },
  render: controlledRender,
  args: {
    checked: false,
    label: "전체 공개",
  },
};

export const WithoutLabel: Story = {
  name: "레이블 없음",
  parameters: {
    docs: {
      description: {
        story:
          "label 없이 아이콘만 표시하는 상태입니다. aria-label로 접근성 레이블을 제공합니다.",
      },
    },
  },
  render: controlledRender,
  args: {
    checked: true,
    ariaLabel: "전체 공개",
  },
};

export const Disabled: Story = {
  name: "비활성화 (꺼짐)",
  parameters: {
    docs: {
      description: { story: "상호작용이 불가능한 비활성화 상태입니다." },
    },
  },
  render: controlledRender,
  args: {
    checked: false,
    disabled: true,
    label: "전체 공개",
  },
};

export const DisabledOn: Story = {
  name: "비활성화 (켜짐)",
  parameters: {
    docs: {
      description: {
        story: "켜진 채로 상호작용이 불가능한 비활성화 상태입니다.",
      },
    },
  },
  render: controlledRender,
  args: {
    checked: true,
    disabled: true,
    label: "전체 공개",
  },
};
