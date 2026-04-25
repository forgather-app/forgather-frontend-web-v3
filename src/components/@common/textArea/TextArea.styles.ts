import styled from "@emotion/styled";

interface WrapperProps {
  $isFocused: boolean;
  $hasError: boolean;
  $size: "medium" | "large";
}

interface CounterProps {
  $isFocused: boolean;
  $hasError: boolean;
}

interface BottomRowProps {
  $hasError: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px;
  border: ${({ $isFocused, $hasError, theme }) => {
    if ($hasError) return `1px solid ${theme.colors.semantic.alertRed}`;
    if ($isFocused) return `1px solid ${theme.colors.main.purple}`;
    return "1px solid transparent";
  }};
  height: ${({ $size }) => ($size === "large" ? "179px" : "auto")};
  padding: ${({ $size }) => ($size === "medium" ? "8px 12px" : "12px")};
  width: 100%;
  box-sizing: border-box;
`;

export const Textarea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.white};
  caret-color: ${({ theme }) => theme.colors.main.purple};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray300};
  }

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
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
  color: ${({ $isFocused, $hasError, theme }) =>
    $hasError || $isFocused
      ? theme.colors.gray.gray200
      : theme.colors.gray.gray300};
  text-align: right;
`;
