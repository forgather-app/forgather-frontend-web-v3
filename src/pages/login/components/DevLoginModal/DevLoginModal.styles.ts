import styled from "@emotion/styled";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading3 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray400};
  border-radius: 8px;
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray300};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.main.purple};
  }
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 8px;
`;
