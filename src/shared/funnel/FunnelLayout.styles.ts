import styled from "@emotion/styled";

export const Container = styled.div`
  /* Layout(flex column)이 이미 safe-area와 하단 여백을 뺀 높이를 주므로 그 높이를 그대로 채운다 */
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
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
