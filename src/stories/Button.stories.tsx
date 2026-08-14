import type { Meta, StoryObj } from "@storybook/react-vite";
import IcPlus from "../assets/icons/ic_plus.svg?react";
import IcSearch from "../assets/icons/ic_search.svg?react";
import Button from "../components/@common/Button/Button";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "공통 버튼 컴포넌트입니다.\n\n**variant 종류:**\n- `primary` / `secondary` / `tertiary`: 전체 너비 기본 버튼\n- `danger`: 위험 액션 버튼 (탈퇴 등 파괴적 동작, 붉은 반투명 배경)\n- `underlined`: 텍스트 링크형\n- `pill`: 소형 필 버튼 (disabled 시 어두운 배경)\n- `pillWeak`: 소형 필 버튼 (disabled 시 회색 배경)\n- `action`: 아이콘+텍스트 CTA (보라색, shadow)\n- `icon`: 40×40 원형 아이콘 버튼\n\n`pill`·`pillWeak`·`action`은 `icon` prop으로 좌측 아이콘을 추가할 수 있습니다.\n`icon` variant는 `icon` prop만 사용하며 반드시 `aria-label`을 함께 전달해야 합니다.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "primary",
        "secondary",
        "tertiary",
        "danger",
        "underlined",
        "pill",
        "pillWeak",
        "action",
        "icon",
      ],
      description: "버튼 시각 변형",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부 (Figma `inactive` 상태)",
    },
    text: {
      control: { type: "text" },
      description: "버튼 텍스트. `icon` variant에서는 사용하지 않습니다.",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "16px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: { story: "주요 액션 버튼. 전체 너비로 렌더링됩니다." },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "primary", text: "BUTTON" },
};

export const PrimaryDisabled: Story = {
  parameters: { docs: { description: { story: "Primary 비활성 상태." } } },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "primary", disabled: true, text: "BUTTON" },
};

export const Secondary: Story = {
  parameters: { docs: { description: { story: "보조 액션 버튼." } } },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "secondary", text: "BUTTON" },
};

export const SecondaryDisabled: Story = {
  parameters: { docs: { description: { story: "Secondary 비활성 상태." } } },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "secondary", disabled: true, text: "BUTTON" },
};

export const Tertiary: Story = {
  parameters: {
    docs: { description: { story: "부가 액션 버튼 (흰색 배경)." } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "tertiary", text: "BUTTON" },
};

export const TertiaryDisabled: Story = {
  parameters: { docs: { description: { story: "Tertiary 비활성 상태." } } },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "tertiary", disabled: true, text: "BUTTON" },
};

export const Danger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "위험 액션 버튼 (붉은 반투명 배경). 탈퇴하기 등 파괴적 동작에 사용합니다. hover 시 배경이 진해지고, active(pressed) 시 배경이 solid red로 채워집니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "danger", text: "탈퇴하기" },
};

export const DangerDisabled: Story = {
  parameters: { docs: { description: { story: "Danger 비활성 상태." } } },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "danger", disabled: true, text: "탈퇴하기" },
};

export const Underlined: Story = {
  parameters: {
    docs: { description: { story: "텍스트 링크형 버튼 (밑줄, 너비 자동)." } },
  },
  args: { variant: "underlined", text: "BUTTON" },
};

export const Pill: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "소형 필 버튼. 활성: 흰색 배경 / 비활성(disabled): 어두운(gray600) 배경.",
      },
    },
  },
  args: { variant: "pill", text: "button" },
};

export const PillDisabled: Story = {
  parameters: { docs: { description: { story: "Pill 비활성 상태." } } },
  args: { variant: "pill", disabled: true, text: "button" },
};

export const PillWithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pill에 아이콘을 추가한 형태. `icon` prop으로 ReactNode를 전달합니다.",
      },
    },
  },
  args: {
    variant: "pill",
    text: "button",
    icon: <IcSearch width={24} height={24} />,
  },
};

export const PillWithIconDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pill 아이콘 비활성 상태. 아이콘 stroke가 gray300으로 변경됩니다.",
      },
    },
  },
  args: {
    variant: "pill",
    disabled: true,
    text: "button",
    icon: <IcSearch width={24} height={24} />,
  },
};

export const PillWeak: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "소형 필 버튼. 활성: 흰색 배경 / 비활성(disabled): 회색(gray500) 배경.",
      },
    },
  },
  args: { variant: "pillWeak", text: "button" },
};

export const PillWeakDisabled: Story = {
  parameters: { docs: { description: { story: "PillWeak 비활성 상태." } } },
  args: { variant: "pillWeak", disabled: true, text: "button" },
};

export const Action: Story = {
  parameters: {
    docs: {
      description: {
        story: "아이콘+텍스트 CTA 버튼. 보라색 배경에 shadow가 적용됩니다.",
      },
    },
  },
  args: {
    variant: "action",
    text: "방명록 남기기",
    icon: <IcPlus width={24} height={24} />,
  },
};

export const ActionDisabled: Story = {
  parameters: { docs: { description: { story: "Action 비활성 상태." } } },
  args: {
    variant: "action",
    disabled: true,
    text: "방명록 남기기",
    icon: <IcPlus width={24} height={24} />,
  },
};

export const Icon: Story = {
  parameters: {
    docs: {
      description: {
        story: "40×40 원형 아이콘 버튼. 반드시 `aria-label`을 전달해야 합니다.",
      },
    },
  },
  args: {
    variant: "icon",
    icon: <IcSearch width={24} height={24} />,
    "aria-label": "검색",
  },
};
