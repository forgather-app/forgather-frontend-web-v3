import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NameField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LabelRow = styled.div<{ $hasError: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding-left: ${({ $hasError }) => ($hasError ? "4px" : "0")};
`;

export const RequiredDot = styled.span`
  width: 4px;
  height: 4px;
  margin-top: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.semantic.accent};
`;

export const Label = styled.label`
  ${({ theme }) => ({ ...theme.typography.label, fontWeight: 700 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const ConnectionField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const ConnectionLabel = styled.span`
  ${({ theme }) => ({ ...theme.typography.label, fontWeight: 700 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const RegisterButton = styled.button`
  height: 48px;
  padding: 13px 16px;
  border: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray.gray600};
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.white};
  cursor: pointer;
  &:disabled {
    color: ${({ theme }) => theme.colors.gray.gray400};
    cursor: default;
  }
`;

export const Chip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  box-sizing: border-box;
  padding: 12px 10px 12px 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray.gray600};
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;
