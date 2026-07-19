import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  min-height: 100dvh;
  /* 상단 상태 표시줄(48px) + 여백(48px) 대체 */
  padding-top: 48px;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Subtitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const GraphicArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// TODO: [그래픽] - Figma에도 최종 에셋 없이 placeholder로 표기됨. 준비되면 교체
export const GraphicPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border: 1px dashed ${({ theme }) => theme.colors.gray.gray200};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray.gray300};
  ${({ theme }) => ({ ...theme.typography.caption })};
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SkipButton = styled.button`
  ${({ theme }) => ({ ...theme.typography.body3 })};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray.gray300};
  padding: 8px 0;
`;
