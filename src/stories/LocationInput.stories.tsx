import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import LocationInput from "../components/@common/LocationInput/LocationInput";
import type { LocationInputValue } from "../components/@common/LocationInput/locationValue";

const meta: Meta<typeof LocationInput> = {
  title: "Common/LocationInput",
  component: LocationInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "전시 장소명을 입력하고 카카오맵 장소를 연결하는 필드입니다. 장소명을 입력한 뒤 '장소 검색' 버튼을 누르면 카카오맵 장소 검색 다이얼로그가 열리고, 장소를 선택하면 연결된 장소 칩으로 표시됩니다.",
      },
    },
  },
  argTypes: {
    value: {
      description: "장소명 · 연결된 카카오맵 장소 ID · URL",
    },
    onChange: {
      description: "장소명 입력, 장소 선택/해제 시 호출됩니다",
    },
    onBlur: {
      description: "장소명 입력창 포커스 아웃 시 호출됩니다",
    },
    errorMessage: {
      description:
        "에러 메시지 — 전달되면 입력창에 에러 상태가 표시됩니다 (연결된 장소가 있으면 라벨 옆 점으로도 표시)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LocationInput>;

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "아직 장소명을 입력하지 않은 기본 상태입니다. 장소 검색 버튼은 비활성화됩니다.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<LocationInputValue>({
      placeName: "",
      placeId: "",
      placeUrl: "",
    });
    return <LocationInput {...args} value={value} onChange={setValue} />;
  },
};

export const NameOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "장소명만 입력되어 카카오맵 연결은 되지 않은 상태입니다.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<LocationInputValue>({
      placeName: "홍익대학교 홍문관 4층",
      placeId: "",
      placeUrl: "",
    });
    return <LocationInput {...args} value={value} onChange={setValue} />;
  },
};

export const Linked: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "카카오맵 장소가 연결되어 '등록된 장소' 칩이 표시됩니다. 칩의 X 버튼으로 연결을 해제할 수 있습니다.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<LocationInputValue>({
      placeName: "홍익대학교 홍문관 4층",
      placeId: "123456",
      placeUrl: "https://place.map.kakao.com/123456",
    });
    return <LocationInput {...args} value={value} onChange={setValue} />;
  },
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "errorMessage가 전달되면 입력창 테두리와 안내 문구가 빨간색으로 표시됩니다.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<LocationInputValue>({
      placeName: "",
      placeId: "",
      placeUrl: "",
    });
    return (
      <LocationInput
        {...args}
        value={value}
        onChange={setValue}
        errorMessage="장소명을 입력해주세요."
      />
    );
  },
};
