import styled from "@emotion/styled";

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.span`
  ${({ theme }) => theme.typography.subBody};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const LocationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const LocationButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
  height: 45px;
  padding: 12px 16px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.gray.white : theme.colors.gray.gray700};
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.gray.white : theme.colors.gray.gray400};
  border-radius: 8px;
  cursor: pointer;
  ${({ theme }) => theme.typography.subBody};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.semantic.black : theme.colors.gray.gray300};
  transition: background-color 0.15s ease, color 0.15s ease;
`;
