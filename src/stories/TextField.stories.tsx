import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ComponentProps, useState } from "react";
import TextField from "../components/@common/TextField/TextField";

const meta: Meta<typeof TextField> = {
  title: "Common/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "범용 텍스트 입력 컴포넌트입니다. `variant` prop으로 네 가지 형태를 제공합니다.\n\n" +
          "- `default`: 아이콘 없는 기본 입력 필드.\n" +
          "- `search`: 돋보기 아이콘 포함. 포커스 + 값 입력 시 Clear 버튼이 노출되며, 값이 있을 때 하단 선이 흰색으로 강조됩니다.\n" +
          "- `link`: 링크 아이콘 포함. 값 입력 시 Clear 버튼 노출, `errorMessage` 설정 시 에러 상태(빨간 하단 선 + 하단 메시지)로 표시됩니다.\n" +
          "- `count`: 글자 수 카운터 포함. rounded box 스타일. 포커스 + 값 입력 시 보라색 전체 테두리, `errorMessage` 설정 시 빨간 테두리와 카운터 하단 에러 메시지가 표시됩니다.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "컴포넌트 변형",
      table: {
        type: { summary: "'default' | 'search' | 'link' | 'count'" },
        defaultValue: { summary: "'default'" },
      },
      control: { type: "select" },
      options: ["default", "search", "link", "count"],
    },
    value: {
      description: "현재 입력 값 (controlled)",
      table: { type: { summary: "string" } },
    },
    onChange: {
      description:
        "값 변경 핸들러. 네이티브 input change 이벤트를 그대로 받습니다. `(e: React.ChangeEvent<HTMLInputElement>) => void`",
      table: { type: { summary: "ChangeEventHandler<HTMLInputElement>" } },
    },
    onClear: {
      description:
        "Clear 버튼 클릭 시 호출. 미지정 시 빈 값으로 onChange 이벤트를 발생시킵니다. search · link variant에서 사용됩니다.",
      table: { type: { summary: "() => void" } },
    },
    placeholder: {
      description:
        "입력 필드 placeholder 텍스트. 미지정 시 variant별 기본값이 사용됩니다.",
      table: { type: { summary: "string" } },
    },
    errorMessage: {
      description:
        "에러 메시지. link · count variant에서 에러 상태로 표시됩니다.",
      table: { type: { summary: "string" } },
    },
    maxCount: {
      description:
        "최대 글자 수. count variant에서 사용하며, 설정 시 `{현재} / {maxCount}자` 카운터가 표시됩니다. 한국어 조합 중인 자모도 1글자로 카운팅됩니다.",
      table: { type: { summary: "number" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

const ControlledTextField = (args: ComponentProps<typeof TextField>) => {
  const [value, setValue] = useState(String(args.value ?? ""));
  return (
    <TextField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  name: "Default / 기본 입력",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "default",
    value: "",
    placeholder: "내용을 입력해주세요",
  },
  parameters: {
    docs: {
      description: {
        story:
          "아이콘 없는 기본 입력 필드입니다. 하단 선 색상이 항상 gray400으로 고정됩니다.",
      },
    },
  },
};

export const DefaultTyped: Story = {
  name: "Default / 입력 완료",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "default",
    value: "홍대 앞 전시공간",
    placeholder: "내용을 입력해주세요",
    maxCount: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          "default variant에 값이 입력된 상태입니다. 테두리 색상은 변하지 않습니다.",
      },
    },
  },
};

export const Search: Story = {
  name: "Search / 기본",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "search",
    value: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "검색 아이콘이 포함된 입력 필드입니다. 값이 없는 기본 상태(gray400 테두리)입니다.",
      },
    },
  },
};

export const SearchTyped: Story = {
  name: "Search / 입력 완료",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "search",
    value: "서울특별시 마포구 와우산로 94",
  },
  parameters: {
    docs: {
      description: {
        story:
          "값이 있고 포커스를 잃은 상태입니다. 하단 선이 흰색으로 강조되며 Clear 버튼은 숨겨집니다.",
      },
    },
  },
};

export const SearchInput: Story = {
  name: "Search / 입력 중",
  render: (args) => <ControlledTextField {...args} autoFocus />,
  args: {
    variant: "search",
    value: "서울특별시 마포구 와우산로 94",
  },
  parameters: {
    docs: {
      description: {
        story: "포커스 + 값이 있는 상태입니다. 우측에 Clear 버튼이 노출됩니다.",
      },
    },
  },
};

export const Link: Story = {
  name: "Link / 기본",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "link",
    value: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "링크 아이콘이 포함된 입력 필드입니다. 값이 없는 기본 상태입니다.",
      },
    },
  },
};

export const LinkWithValue: Story = {
  name: "Link / 값 입력",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "link",
    value: "https://forgather.app/",
  },
  parameters: {
    docs: {
      description: {
        story:
          "값이 입력된 상태입니다. 하단 선이 흰색으로 바뀌고 Clear 버튼이 표시됩니다.",
      },
    },
  },
};

export const LinkError: Story = {
  name: "Link / 에러",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "link",
    value: "https://forgather",
    errorMessage: "유효하지 않은 링크에요",
  },
  parameters: {
    docs: {
      description: {
        story:
          "에러 상태입니다. 하단 선이 빨간색으로 바뀌고 에러 메시지가 하단에 표시됩니다.",
      },
    },
  },
};

export const Count: Story = {
  name: "Count / 기본",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "count",
    value: "",
    maxCount: 20,
    placeholder: "닉네임을 입력해주세요",
  },
  parameters: {
    docs: {
      description: {
        story:
          "글자 수 카운터가 포함된 입력 필드입니다. 값이 없는 기본 상태입니다.",
      },
    },
  },
};

export const CountTapped: Story = {
  name: "Count / 포커스",
  render: (args) => <ControlledTextField {...args} autoFocus />,
  args: {
    variant: "count",
    value: "",
    maxCount: 20,
    placeholder: "닉네임을 입력해주세요",
  },
  parameters: {
    docs: {
      description: {
        story: "포커스된 상태입니다. 카운터 색상이 gray200으로 밝아집니다.",
      },
    },
  },
};

export const CountTyping: Story = {
  name: "Count / 입력 중",
  render: (args) => <ControlledTextField {...args} autoFocus />,
  args: {
    variant: "count",
    value: "김여름",
    maxCount: 20,
    placeholder: "닉네임을 입력해주세요",
  },
  parameters: {
    docs: {
      description: {
        story: "포커스 + 값이 있는 상태입니다. 테두리가 보라색으로 표시됩니다.",
      },
    },
  },
};

export const CountTyped: Story = {
  name: "Count / 입력 완료",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "count",
    value: "포게더의 두근두근 전시회",
    maxCount: 20,
    placeholder: "닉네임을 입력해주세요",
  },
  parameters: {
    docs: {
      description: {
        story:
          "포커스를 잃은 상태입니다. 테두리가 사라지고 카운터 색상이 gray300으로 돌아옵니다.",
      },
    },
  },
};

export const CountError: Story = {
  name: "Count / 에러",
  render: (args) => <ControlledTextField {...args} />,
  args: {
    variant: "count",
    value: "김여름가을겨울포게더스무자이상",
    maxCount: 20,
    errorMessage: "20자 이내로 입력해주세요",
    placeholder: "닉네임을 입력해주세요",
  },
  parameters: {
    docs: {
      description: {
        story:
          "에러 상태입니다. 테두리가 빨간색으로 표시되고 카운터 우측 하단에 에러 메시지가 표시됩니다.",
      },
    },
  },
};

export const LinkInteractive: Story = {
  name: "Link / 인터랙티브",
  parameters: {
    docs: {
      description: {
        story:
          "직접 값을 입력해 세 가지 상태(기본 · 입력됨 · 에러)를 확인할 수 있는 스토리입니다.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const isInvalidUrl = value.length > 0 && !value.startsWith("https://");
    return (
      <TextField
        {...args}
        variant="link"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        errorMessage={isInvalidUrl ? "유효하지 않은 링크에요" : undefined}
      />
    );
  },
};
