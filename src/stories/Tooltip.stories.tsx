import styled from "@emotion/styled";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Tooltip from "../components/@common/tooltip/Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Common/Tooltip",
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          "범용 툴팁 컴포넌트. children으로 내용을 자유롭게 구성하고, onClose 전달 시 X 버튼이 노출됩니다.\n\n" +
          "`variant='dark'`(기본)는 검정 배경에 화살표가 왼쪽으로 오프셋되어 있고, `variant='gradient'`는 그레이 그라데이션 배경에 화살표가 오른쪽에 위치합니다 (예: 빈 상태 안내 말풍선).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const CountText = styled.span`
  color: ${({ theme }) => theme.colors.gray.gray50};
  ${({ theme }) => ({ ...theme.typography.caption })};
`;

const SubText = styled.span`
  color: ${({ theme }) => theme.colors.gray.gray300};
  ${({ theme }) => ({ ...theme.typography.caption })};
`;

export const WithClose: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "onClose 핸들러가 있을 때 X 버튼이 표시되는 케이스. 방명록 새 알림 예시.",
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(true);
    if (!visible)
      return (
        <button type="button" onClick={() => setVisible(true)}>
          다시 열기
        </button>
      );
    return (
      <Tooltip onClose={() => setVisible(false)} ariaLabel="3개의 새 방명록">
        <CountText>3개</CountText>
        <SubText>의 새 방명록</SubText>
      </Tooltip>
    );
  },
};

export const WithoutClose: Story = {
  parameters: {
    docs: {
      description: {
        story: "onClose 없이 순수 정보 표시만 하는 케이스.",
      },
    },
  },
  render: () => (
    <Tooltip ariaLabel="안내 메시지">
      <CountText>안내</CountText>
      <SubText> 텍스트입니다</SubText>
    </Tooltip>
  ),
};

export const Gradient: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "grayscale/500→600 그라데이션 배경, 화살표가 오른쪽에 위치하는 케이스. 빈 상태에서 특정 버튼을 가리킬 때 사용합니다.",
      },
    },
  },
  render: () => (
    <Tooltip variant="gradient" ariaLabel="첫번째 작품을 소개해주세요!">
      <SubText style={{ color: "white" }}>첫번째 작품을 소개해주세요!</SubText>
    </Tooltip>
  ),
};
