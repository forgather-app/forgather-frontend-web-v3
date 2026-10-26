import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import PeriodInput, {
  type PeriodInputValue,
} from "../components/@common/PeriodInput/PeriodInput";

const meta: Meta<typeof PeriodInput> = {
  title: "Common/PeriodInput",
  component: PeriodInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "전시 시작일 · 종료일을 선택하는 필드입니다. 입력창을 탭하면 바텀시트로 범위 캘린더(react-day-picker)가 열리고, 확인을 누르면 선택한 범위가 onChange로 전달됩니다.",
      },
    },
  },
  argTypes: {
    value: {
      description: "선택된 전시 시작일 · 종료일",
    },
    onChange: {
      description: "시작일 · 종료일을 모두 선택하고 확인을 누르면 호출됩니다",
    },
    errorMessage: {
      description: "에러 메시지 — 전달되면 두 입력창에 에러 상태가 표시됩니다",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PeriodInput>;

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: "아직 아무 날짜도 선택하지 않은 기본 상태입니다.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<PeriodInputValue>({
      startDate: null,
      endDate: null,
    });
    return <PeriodInput {...args} value={value} onChange={setValue} />;
  },
};

export const Filled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "시작일 · 종료일이 모두 선택된 상태입니다. 각 입력창 오른쪽의 X 버튼으로 해당 날짜만 따로 지울 수 있습니다.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<PeriodInputValue>({
      startDate: new Date(2026, 2, 1),
      endDate: new Date(2026, 2, 14),
    });
    return <PeriodInput {...args} value={value} onChange={setValue} />;
  },
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: "errorMessage가 전달되면 입력창 테두리가 빨간색으로 표시됩니다.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<PeriodInputValue>({
      startDate: null,
      endDate: null,
    });
    return (
      <PeriodInput
        {...args}
        value={value}
        onChange={setValue}
        errorMessage="전시 기간을 선택해주세요"
      />
    );
  },
};
