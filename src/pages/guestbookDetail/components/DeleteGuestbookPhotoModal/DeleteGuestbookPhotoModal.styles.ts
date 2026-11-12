import styled from "@emotion/styled";

export const ConfirmBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
`;

export const ConfirmTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const ConfirmTitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const ConfirmSubtitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const ConfirmActions = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;
