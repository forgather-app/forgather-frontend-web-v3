import styled from "@emotion/styled";

export const Trigger = styled.button<{ $hasValue: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const Label = styled.span<{ $hasValue: boolean }>`
  ${({ theme }) => theme.typography.body2};
  color: ${({ $hasValue, theme }) =>
    $hasValue ? theme.colors.gray.white : theme.colors.gray.gray300};
`;

export const IconArea = styled.span<{ $hasValue: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  color: ${({ $hasValue, theme }) =>
    $hasValue ? theme.colors.gray.white : theme.colors.gray.gray300};
`;
