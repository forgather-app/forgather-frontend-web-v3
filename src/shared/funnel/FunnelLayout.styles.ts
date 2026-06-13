import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 16px;
  overflow-y: auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: pre-line;
`;

export const Footer = styled.footer`
  flex-shrink: 0;
  padding: 12px 16px;
`;
