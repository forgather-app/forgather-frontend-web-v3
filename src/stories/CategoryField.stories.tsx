import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import CategoryField from "../components/@common/categoryField/CategoryField";

const meta: Meta<typeof CategoryField> = {
  title: "Common/CategoryField",
  component: CategoryField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "카테고리 입력 필드 컴포넌트. '#' 접두사가 붙은 텍스트 입력과 추가 버튼으로 구성되며, 추가된 카테고리는 chip 형태로 하단에 표시됩니다. 각 chip의 제거 버튼으로 카테고리를 삭제할 수 있습니다.",
      },
    },
  },
  argTypes: {
    value: {
      description: "현재 입력 중인 카테고리 값 (# 제외)",
      table: { type: { summary: "string" } },
    },
    onChange: {
      description: "입력값 변경 핸들러",
      table: { type: { summary: "(value: string) => void" } },
    },
    categories: {
      description: "추가된 카테고리 목록 (# 제외)",
      table: { type: { summary: "string[]" } },
    },
    onAdd: {
      description: "카테고리 추가 버튼 클릭 핸들러",
      table: { type: { summary: "() => void" } },
    },
    onRemove: {
      description:
        "카테고리 chip 제거 핸들러. 제거할 항목의 index를 인자로 받음",
      table: { type: { summary: "(index: number) => void" } },
    },
    placeholder: {
      description: "입력 필드 플레이스홀더",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CategoryField>;

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "입력 → 추가 → 제거 흐름을 모두 체험할 수 있는 인터랙티브 스토리.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const [categories, setCategories] = useState<string[]>([
      "애니메이션",
      "영화",
    ]);

    const handleAdd = () => {
      const trimmed = value.trim();
      if (trimmed) {
        setCategories((prev) => [...prev, trimmed]);
        setValue("");
      }
    };

    const handleRemove = (index: number) => {
      setCategories((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <div>
        <CategoryField
          {...args}
          value={value}
          onChange={setValue}
          categories={categories}
          onAdd={handleAdd}
          onRemove={handleRemove}
          placeholder="카테고리를 입력하세요"
        />
      </div>
    );
  },
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: "카테고리가 없는 초기 상태. chip 목록이 노출되지 않는다.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div>
        <CategoryField
          {...args}
          value={value}
          onChange={setValue}
          categories={[]}
          onAdd={() => {}}
          onRemove={() => {}}
          placeholder="카테고리를 입력하세요"
        />
      </div>
    );
  },
};

export const WithManyCategories: Story = {
  parameters: {
    docs: {
      description: {
        story: "카테고리가 많을 때 chip들이 줄바꿈되어 표시되는 상태.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const [categories, setCategories] = useState<string[]>([
      "애니메이션",
      "영화",
      "드라마",
      "음악",
      "스포츠",
    ]);

    const handleRemove = (index: number) => {
      setCategories((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <div>
        <CategoryField
          {...args}
          value={value}
          onChange={setValue}
          categories={categories}
          onAdd={() => {}}
          onRemove={handleRemove}
          placeholder="카테고리를 입력하세요"
        />
      </div>
    );
  },
};
