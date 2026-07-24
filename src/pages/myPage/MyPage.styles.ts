import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0 24px;
`;

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* TODO: 토큰 없음 - #D9D9D9 (프로필 이미지 placeholder) */
  background-color: #d9d9d9;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Name = styled.strong`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const NameSuffix = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading3 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const IntroText = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: pre-line;
`;

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-decoration: underline;
`;

export const Divider = styled.div`
  height: 12px;
  margin: 0 -16px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
`;

export const MenuList = styled.ul`
  padding-top: 4px;
`;

const menuRow = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding-right: 4px;
  border-bottom: 1px solid ${theme.colors.gray.gray600};
  ${{ ...theme.typography.subBody }};
  color: ${theme.colors.gray.gray50};
`;

export const MenuButton = styled.button`
  ${({ theme }) => menuRow(theme)};
`;

export const MenuRow = styled.div`
  ${({ theme }) => menuRow(theme)};
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  padding: 16px 0;
`;

export const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InquiryButton = styled.button`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-decoration: underline;
`;

export const WithdrawButton = styled.button`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray400};
  text-decoration: underline;
`;

export const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Copyright = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;
