import styled from "@emotion/styled";

export const Container = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

export const ScrollArea = styled.main`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.sectionGap}px;
  padding-top: 12px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: pre-line;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const PrivacyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray500};
  border-radius: 8px;
`;

export const PrivacyLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const Footer = styled.footer`
  flex-shrink: 0;
  padding: 12px 0;
`;
