import styled from "@emotion/styled";

export const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  /* TODO: 토큰 없음 - 35px (제목 ~ 콘텐츠 간격, Figma 실측값) */
  gap: 35px;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  overflow: hidden;
`;

export const TopGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.sidePadding}px;
`;

export const Title = styled.h2`
  flex-shrink: 0;
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: pre-line;
`;

export const Main = styled.main`
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

export const Footer = styled.footer`
  flex-shrink: 0;
`;
