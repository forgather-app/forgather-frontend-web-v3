import styled from "@emotion/styled";

interface WrapperProps {
  $hasError: boolean;
  $size: "medium" | "large";
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
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.semantic.alertRed : "transparent"};
  height: ${({ $size }) => ($size === "large" ? "179px" : "auto")};
  padding: ${({ $size }) => ($size === "medium" ? "8px 12px" : "12px")};
  width: 100%;
  box-sizing: border-box;
  --counter-color: ${({ theme }) => theme.colors.gray.gray300};

  &:focus-within {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.semantic.alertRed : theme.colors.main.purple};
    --counter-color: ${({ theme }) => theme.colors.gray.gray200};
  }
`;

export const Textarea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  ${({ theme }) => ({ ...theme.typography.body3 })};
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
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.gray.gray200 : "var(--counter-color)"};
  text-align: right;
`;
