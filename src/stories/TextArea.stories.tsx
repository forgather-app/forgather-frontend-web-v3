import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ComponentProps, useState } from "react";
import TextArea from "../components/@common/TextArea/TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Common/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "텍스트 입력 영역 컴포넌트입니다. `size`로 높이를 조절하고, `maxLength` 초과 시 에러 메시지를 자동으로 표시합니다. 이모지는 1글자로 카운팅됩니다.",
      },
    },
  },
  argTypes: {
    size: {
      description: "높이 크기",
      control: "radio",
      options: ["medium", "large"],
      table: {
        defaultValue: { summary: "large" },
        type: { summary: '"medium" | "large"' },
      },
    },
    maxLength: {
      description:
        "최대 입력 가능 글자 수. 초과 시 에러 메시지를 자동 표시합니다.",
      control: "number",
      table: {
        defaultValue: { summary: "200" },
      },
    },
    placeholder: {
      description: "입력 전 표시되는 안내 텍스트",
      control: "text",
    },
    errorMessage: {
      description:
        "외부에서 주입하는 에러 메시지. maxLength 초과 에러보다 우선 표시됩니다.",
      control: "text",
    },
    value: {
      description: "현재 입력된 값 (controlled)",
      control: "text",
    },
    onChange: {
      description:
        "값 변경 핸들러. 네이티브 textarea change 이벤트를 그대로 받습니다. `(e: React.ChangeEvent<HTMLTextAreaElement>) => void`",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

const ControlledTextArea = (args: ComponentProps<typeof TextArea>) => {
  const [value, setValue] = useState(String(args.value ?? ""));
  return (
    <TextArea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const LargeDefault: Story = {
  name: "Large / 기본",
  render: (args) => <ControlledTextArea {...args} />,
  args: {
    size: "large",
    value: "",
    placeholder: "전시에 대한 설명을 작성해주세요.",
  },
  parameters: {
    docs: { description: { story: "값이 없는 기본 상태입니다." } },
  },
};

export const LargeTyped: Story = {
  name: "Large / 입력됨",
  render: (args) => <ControlledTextArea {...args} />,
  args: {
    size: "large",
    value:
      "빛과 그림자가 교차하는 공간 속에서 일상의 감각을 새롭게 환기하는 전시. 서로 다른 시선이 만나 질문을 던지고, 익숙한 장면을 낯설게 재구성한다.",
    placeholder: "전시에 대한 설명을 작성해주세요.",
  },
  parameters: {
    docs: { description: { story: "텍스트가 입력된 상태입니다." } },
  },
};

export const LargeError: Story = {
  name: "Large / 에러",
  render: (args) => <ControlledTextArea {...args} />,
  args: {
    size: "large",
    value:
      "빛과 그림자가 교차하는 공간 속에서 일상의 감각을 새롭게 환기하는 전시. 서로 다른 시선이 만나 질문을 던지고, 익숙한 장면을 낯설게 재구성한다.",
    placeholder: "전시에 대한 설명을 작성해주세요.",
    errorMessage: "error messege",
  },
  parameters: {
    docs: { description: { story: "외부 에러 메시지가 주입된 상태입니다." } },
  },
};

export const MediumDefault: Story = {
  name: "Medium / 기본",
  render: (args) => <ControlledTextArea {...args} />,
  args: {
    size: "medium",
    maxLength: 100,
    value: "",
    placeholder: "전시에 대한 설명을 작성해주세요.",
  },
  parameters: {
    docs: {
      description: {
        story: "높이가 콘텐츠에 맞게 자동 조절되는 medium 기본 상태입니다.",
      },
    },
  },
};

export const MediumTyped: Story = {
  name: "Medium / 입력됨",
  render: (args) => <ControlledTextArea {...args} />,
  args: {
    size: "medium",
    maxLength: 100,
    value:
      "빛과 그림자가 교차하는 공간 속에서 일상의 감각을 새롭게 환기하는 전시.",
    placeholder: "전시에 대한 설명을 작성해주세요.",
  },
  parameters: {
    docs: { description: { story: "텍스트가 입력된 상태입니다." } },
  },
};

export const MediumError: Story = {
  name: "Medium / 에러",
  render: (args) => <ControlledTextArea {...args} />,
  args: {
    size: "medium",
    maxLength: 100,
    value:
      "빛과 그림자가 교차하는 공간 속에서 일상의 감각을 새롭게 환기하는 전시.",
    placeholder: "전시에 대한 설명을 작성해주세요.",
    errorMessage: "error messege",
  },
  parameters: {
    docs: { description: { story: "외부 에러 메시지가 주입된 상태입니다." } },
  },
};
