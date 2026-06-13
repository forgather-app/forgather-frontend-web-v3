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

export const Label = styled.label`
  ${({ theme }) => theme.typography.subBody};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;
