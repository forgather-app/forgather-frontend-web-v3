import styled from "@emotion/styled";

export const PageWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 0 100px;
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

export const FieldLabel = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const PhotoLabel = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const RequiredDot = styled.span`
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.semantic.alertRed};
`;

export const Footer = styled.footer`
  position: sticky;
  bottom: 0;
  padding-top: 16px;
  background: linear-gradient(
    0deg,
    ${({ theme }) => theme.colors.gray.gray700} 38%,
    transparent 100%
  );
`;
