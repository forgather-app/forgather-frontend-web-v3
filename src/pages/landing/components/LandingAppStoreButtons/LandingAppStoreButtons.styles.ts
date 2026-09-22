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

/** 다운로드 준비 전까지 비활성 처리한 버튼 - 실제 링크가 생기면 활성화한다 */
export const AppStoreButton = styled.button`
  ${appButtonBase};
  ${({ theme }) => ({ ...theme.typography.body1 })};
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  color: ${({ theme }) => theme.colors.gray.gray400};

  &:disabled {
    cursor: not-allowed;
  }
`;

/** 플레이스토어 출시 전 안내용 비활성 버튼 - 출시 후 실제 링크가 생기면 활성화한다 */
export const PlayStoreButton = styled.button`
  ${appButtonBase};
  ${({ theme }) => ({ ...theme.typography.body1 })};
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  color: ${({ theme }) => theme.colors.gray.gray400};

  &:disabled {
    cursor: not-allowed;
  }
`;
