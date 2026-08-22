import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldRow = styled("div", { shouldForwardProp })<{
  $hasError: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 4px;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  border-bottom: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.semantic.alertRed : theme.colors.gray.gray400};
`;

export const Prefix = styled.span`
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  flex-shrink: 0;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.white};
  caret-color: ${({ theme }) => theme.colors.main.purple};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray300};
  }
`;

export const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ErrorMessage = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.semantic.alertRed};
`;
