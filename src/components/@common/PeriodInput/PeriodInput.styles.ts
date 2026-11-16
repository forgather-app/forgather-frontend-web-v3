import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";

export type DateButtonState = "idle" | "filled" | "error";

const dateButtonStates: Record<DateButtonState, (theme: Theme) => string> = {
  idle: (theme) => `
    color: ${theme.colors.gray.gray300};
  `,
  filled: (theme) => `
    color: ${theme.colors.gray.white};
  `,
  error: (theme) => `
    color: ${theme.colors.gray.white};
    border-color: ${theme.colors.semantic.alertRed};
  `,
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Row = styled.div`
  container-type: inline-size;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Separator = styled.span`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const DateButton = styled.button<{ $state: DateButtonState }>`
  min-width: 0;
  min-height: 48px;
  padding: 11px 0;
  border-radius: 8px;
  border: 0;
  background-color: transparent;
  text-align: left;
  ${({ theme }) => ({ ...theme.typography.body4 })};
  word-break: keep-all;
  ${({ $state, theme }) => dateButtonStates[$state](theme)}

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
`;

export const DateButtonWrapper = styled.div<{
  $hasError: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  justify-content: flex-start;
  padding-inline: 11px;
  border-radius: 8px;
  border: 1px solid ${({ $hasError, theme }) =>
    $hasError ? theme.colors.semantic.alertRed : "transparent"};
  background-color: ${({ theme }) => theme.colors.gray.gray600};

  @container (max-width: 340px) {
    padding-inline: 5px;
  }
`;

export const ClearButton = styled.button`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  /* 아이콘 원 배경(#252930)이 DateButton 배경(gray600)과 같아 묻혀서 덮어씌움 */
  svg rect {
    fill: ${({ theme }) => theme.colors.gray.gray500};
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.semantic.alertRed};
  padding-left: 4px;
`;
