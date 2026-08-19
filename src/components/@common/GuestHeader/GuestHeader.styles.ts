import styled from "@emotion/styled";
import LogoWordmark from "@/assets/icons/logos/logo_wordmark.svg?react";

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  margin: 0 -${({ theme }) => theme.layout.sidePadding}px;
  padding: 24px ${({ theme }) => theme.layout.sidePadding}px 16px;
  background-color: ${({ theme }) => theme.colors.main.purple};
`;

export const Logo = styled(LogoWordmark)`
  path {
    fill: ${({ theme }) => theme.colors.gray.gray50};
  }
`;

export const BrowseLink = styled.a`
  ${({ theme }) => ({ ...theme.typography.button })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;
