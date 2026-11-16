import styled from "@emotion/styled";

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 0 16px;
`;

export const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const HeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const Description = styled.p`
  /* TODO: 토큰 없음 - Body 14/R(14px/400/150%/-2%) */
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-align: center;
  white-space: pre-line;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
  padding: 0 16px;
`;

export const FieldBox = styled.div<{ $hasError: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  border-radius: 8px;
  /* TODO: 토큰 없음 - #373C46 */
  background-color: #373c46;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.semantic.accent : "transparent"};
`;

export const EmailInput = styled.input`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  width: 100%;
  border: none;
  color: ${({ theme }) => theme.colors.gray.gray50};
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray300};
  }
`;

export const FieldError = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.semantic.alertRed};
`;

export const ButtonGroup = styled.div`
  padding: 0 16px;
`;
