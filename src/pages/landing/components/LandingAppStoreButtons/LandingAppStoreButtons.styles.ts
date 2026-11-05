import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LANDING_DESKTOP_QUERY } from "@/pages/landing/LandingPage.constants";

export const AppButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;

  ${LANDING_DESKTOP_QUERY} {
    gap: 16px;
  }
`;

const appButtonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 14px;
  white-space: nowrap;

  ${LANDING_DESKTOP_QUERY} {
    padding: 16px 32px;
    font-size: 18px;
  }
`;

export const AppStoreButton = styled.a`
  ${appButtonBase};
  ${({ theme }) => ({ ...theme.typography.body1 })};
  background:
    radial-gradient(circle at 50% 100%, rgba(30, 32, 34, 1) 0%, rgba(17, 17, 17, 1) 100%) padding-box,
    linear-gradient(127deg, rgba(139, 128, 248, 1) 0%, rgba(89, 75, 250, 1) 100%) border-box;
  color: ${({ theme }) => theme.colors.gray.gray100};
  text-decoration: none;
`;

export const PlayStoreButton = AppStoreButton;
