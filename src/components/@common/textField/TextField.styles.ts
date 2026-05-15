import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import type { TextFieldVariant } from "./TextField";

interface FieldRowProps {
  $variant: TextFieldVariant;
  $hasValue: boolean;
  $hasError: boolean;
  $isFocused: boolean;
}

type InputProps = { $variant: TextFieldVariant };

type CounterProps = { $isFocused: boolean };

const getFieldRowStyles =
  (
    $variant: TextFieldVariant,
    $hasValue: boolean,
    $hasError: boolean,
    $isFocused: boolean,
  ) =>
  (theme: Theme): string => {
    switch ($variant) {
      case "count": {
        const borderColor = $hasError
          ? theme.colors.semantic.alertRed
          : $isFocused && $hasValue
            ? theme.colors.main.purple
            : "transparent";
        return `
          background-color: ${theme.colors.gray.gray600};
          border: 1px solid ${borderColor};
          border-radius: 8px;
          padding: 8px 12px;
          justify-content: space-between;
          align-items: ${$hasError ? "flex-start" : "center"};
        `;
      }
      default: {
        const bottomColor = $hasError
          ? theme.colors.semantic.alertRed
          : $variant !== "default" && $hasValue
            ? theme.colors.gray.white
            : theme.colors.gray.gray400;
        return `
          background-color: ${theme.colors.gray.gray700};
          border-bottom: 1px solid ${bottomColor};
          padding: 12px 4px;
        `;
      }
    }
  };

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldRow = styled.div<FieldRowProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ $variant, $hasValue, $hasError, $isFocused, theme }) =>
    getFieldRowStyles($variant, $hasValue, $hasError, $isFocused)(theme)}
`;


export const Input = styled.input<InputProps>`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  ${({ $variant, theme }) =>
    $variant === "count"
      ? { ...theme.typography.subBody }
      : { ...theme.typography.body3 }};
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

export const CounterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
`;

export const Counter = styled.span<CounterProps>`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ $isFocused, theme }) =>
    $isFocused ? theme.colors.gray.gray200 : theme.colors.gray.gray300};
`;

export const ErrorMessage = styled.span`
  display: block;
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.semantic.alertRed};
`;
