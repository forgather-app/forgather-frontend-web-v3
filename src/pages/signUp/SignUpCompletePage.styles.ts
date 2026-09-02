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
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    height: 116px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      ${({ theme }) => theme.colors.gray.gray700} 73%
    );
    pointer-events: none;
  }
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
