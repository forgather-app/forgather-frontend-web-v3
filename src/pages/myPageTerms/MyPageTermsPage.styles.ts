import styled from "@emotion/styled";

export const Gap = styled.div`
  height: 24px;
`;

export const TermList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TermRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px;
`;

export const TermLabelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
`;

export const TermLabelText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AgreedLabel = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody2 })};
  color: ${({ theme }) => theme.colors.main.purple50};
  flex-shrink: 0;
`;

export const CheckboxIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
`;

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 24px 16px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h3`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const ModalCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray.gray300};
  flex-shrink: 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const ModalBody = styled.div`
  overflow-y: auto;
  max-height: 324px;
  padding-bottom: 16px;
`;
