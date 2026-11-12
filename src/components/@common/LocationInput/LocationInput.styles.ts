import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NameField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding-left: 4px;
`;

export const RequiredDot = styled.span`
  width: 4px;
  height: 4px;
  margin-top: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.semantic.accent};
`;

export const Label = styled.label`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const ConnectionRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const ConnectionButton = styled.button`
  flex-shrink: 0;
  min-height: 50px;
  padding: 0 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  ${({ theme }) => ({ ...theme.typography.button })};
  color: ${({ theme }) => theme.colors.gray.gray50};

  &:disabled {
    color: ${({ theme }) => theme.colors.gray.gray400};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }
`;

export const ConnectedStatus = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  gap: 8px;
  min-height: 50px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  word-break: keep-all;

  svg {
    flex-shrink: 0;
  }
`;
