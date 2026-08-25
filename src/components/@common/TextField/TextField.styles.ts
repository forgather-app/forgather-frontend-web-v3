import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import type { FieldRowStyleVariant, TextFieldVariant } from "./TextField";

type InputProps = { $variant: TextFieldVariant };

const countBase = (theme: Theme) => `
  background-color: ${theme.colors.gray.gray600};
  border-radius: 8px;
  padding: 8px 12px;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
`;

const baseRow = (theme: Theme) => `
  background-color: ${theme.colors.gray.gray700};
  padding: 12px 4px;
`;

const fieldRowVariants: Record<FieldRowStyleVariant, (theme: Theme) => string> =
  {
    "count-error": (theme) =>
      `${countBase(theme)} border: 1px solid ${theme.colors.semantic.alertRed};`,
    "count-active": (theme) =>
      `${countBase(theme)} border: 1px solid ${theme.colors.main.purple};`,
    "count-idle": (theme) =>
      `${countBase(theme)} border: 1px solid transparent;`,
    "base-error": (theme) =>
      `${baseRow(theme)} border-bottom: 1px solid ${theme.colors.semantic.alertRed};`,
    "base-filled": (theme) =>
      `${baseRow(theme)} border-bottom: 1px solid ${theme.colors.gray.white};`,
    "base-idle": (theme) =>
      `${baseRow(theme)} border-bottom: 1px solid ${theme.colors.gray.gray400};`,
    category: (theme) =>
      `${countBase(theme)} border: 1px solid ${theme.colors.main.purple}; flex-direction: row; align-items: center; gap: 4px;`,
  };

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldRow = styled.div<{ $styleVariant: FieldRowStyleVariant }>`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ $styleVariant, theme }) => fieldRowVariants[$styleVariant](theme)}
`;

export const HashPrefix = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.white};
  flex-shrink: 0;
`;

export const LinkIconWrapper = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.gray.gray400};
`;

export const Input = styled.input<InputProps>`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  ${({ $variant, theme }) => {
    if ($variant === "count" || $variant === "category")
      return { ...theme.typography.subBody };
    if ($variant === "link") return { ...theme.typography.body4 };
    return { ...theme.typography.body3 };
  }};
  color: ${({ theme }) => theme.colors.gray.white};
  caret-color: ${({ theme }) => theme.colors.main.purple};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray300};
  }

  &::-webkit-search-cancel-button,
  &::-webkit-search-decoration {
    appearance: none;
    -webkit-appearance: none;
  }
`;

export const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Counter = styled.span<{ $styleVariant: FieldRowStyleVariant }>`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ $styleVariant, theme }) =>
    $styleVariant === "count-active"
      ? theme.colors.gray.gray200
      : theme.colors.gray.gray300};
  flex-shrink: 0;
`;

export const ErrorMessage = styled.span`
  display: block;
  text-align: left;
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.semantic.alertRed};
`;
