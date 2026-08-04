import styled from "@emotion/styled";

export const Container = styled.form`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  overflow: hidden;
`;

export const Title = styled.h1`
  flex-shrink: 0;
  margin-top: 32px;
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const Main = styled.main`
  flex: 1;
  min-height: 0;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 4px;
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const RequiredDot = styled.span`
  width: 4px;
  height: 4px;
  margin-top: 5px;
  border-radius: 50%;
  background-color: #ff4242;
  flex-shrink: 0;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray500};
  border-radius: 8px;
`;

export const ToggleLabelGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToggleLabel = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const Footer = styled.footer`
  flex-shrink: 0;
  padding-top: 12px;
`;
