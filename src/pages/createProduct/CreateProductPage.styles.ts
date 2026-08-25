import styled from "@emotion/styled";

export const PageWrapper = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;

`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: pre-line;
`;

export const ScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 32px;
  padding-bottom: 80px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const RequiredDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.semantic.alertRed};
`;

export const Footer = styled.footer`
  flex-shrink: 0;
`;
