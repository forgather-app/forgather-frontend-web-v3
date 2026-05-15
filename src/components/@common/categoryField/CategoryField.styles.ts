import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border: 1px solid ${({ theme }) => theme.colors.main.purple};
  border-radius: 8px;
`;

export const HashPrefix = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.white};
  flex-shrink: 0;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.white};
  caret-color: ${({ theme }) => theme.colors.main.purple};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray300};
  }
`;

export const AddButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 2px;
  color: ${({ theme }) => theme.colors.main.purple50};
  flex-shrink: 0;
`;

export const AddLabel = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: inherit;
`;

export const ChipsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ChipGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  border-radius: 4px;
`;

export const ChipText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody2 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  border-radius: 50%;
  flex-shrink: 0;
`;
