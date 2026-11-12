import styled from "@emotion/styled";

const heights = {
  medium: "auto",
  large: "179px",
  extraLarge: "229px",
};

export type TextAreaSize = keyof typeof heights;

interface WrapperProps {
  $hasError: boolean;
  $size: TextAreaSize;
}

interface BottomRowProps {
  $hasError: boolean;
}

interface CounterProps {
  $hasError: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ $size }) => ($size === "extraLarge" ? "8px" : "12px")};
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.semantic.alertRed : "transparent"};
  height: ${({ $size }) => heights[$size]};
  padding: ${({ $size }) =>
    $size === "extraLarge"
      ? "11px 11px 7px"
      : $size === "medium"
        ? "8px 12px"
        : "12px"};
  width: 100%;
  box-sizing: border-box;
  --counter-color: ${({ theme }) => theme.colors.gray.gray300};

  &:focus-within {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.semantic.alertRed : theme.colors.main.purple};
    --counter-color: ${({ theme }) => theme.colors.gray.gray200};
  }
`;

export const Textarea = styled.textarea<{ $size: TextAreaSize }>`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  ${({ theme, $size }) => ({
    ...($size === "extraLarge"
      ? theme.typography.body4
      : theme.typography.body3),
  })};
  ${({ $size }) => $size === "extraLarge" && "padding: 0;"}
  color: ${({ theme }) => theme.colors.gray.white};
  caret-color: ${({ theme }) => theme.colors.main.purple};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray300};
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.gray.gray400} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray.gray400};
    border-radius: 999px;
  }
`;

export const BottomRow = styled.div<BottomRowProps>`
  display: flex;
  justify-content: ${({ $hasError }) => ($hasError ? "space-between" : "flex-end")};
  align-items: flex-end;
`;

export const ErrorMessage = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.semantic.alertRed};
`;

export const Counter = styled.span<CounterProps>`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.gray.gray200 : "var(--counter-color)"};
  text-align: right;
`;
