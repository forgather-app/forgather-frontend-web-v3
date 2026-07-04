import styled from "@emotion/styled";

export const Container = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 108px;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const Footer = styled.footer`
  flex-shrink: 0;
  padding: 12px 0;
`;
