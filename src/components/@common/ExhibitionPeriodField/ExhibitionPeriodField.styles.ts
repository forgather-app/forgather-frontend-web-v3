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
  display: flex;
  gap: 12px;
`;

export const FieldColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

export const FieldLabel = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  padding-left: 4px;
`;

export const DateButton = styled.button<{ $state: DateButtonState }>`
  width: 100%;
  padding: 14px 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  text-align: left;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  font-weight: 400; /* TODO: 토큰 없음 - 디자인은 fontWeight 400, subBody 토큰은 500 */
  ${({ $state, theme }) => dateButtonStates[$state](theme)}
`;

export const ErrorMessage = styled.span`
  display: block;
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.semantic.alertRed};
  padding-left: 4px;
`;
