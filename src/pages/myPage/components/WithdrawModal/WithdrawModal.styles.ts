import styled from "@emotion/styled";

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px 0 16px;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const Description = styled.p`
  /* TODO: 토큰 없음 - Body 14/R (400, 14px, 150%, -0.02em) */
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const ButtonRow = styled.div`
  display: flex;
  align-self: stretch;
  gap: 10px;
  padding: 0 16px;
`;

export const CloseButton = styled.button`
  flex: 1;
  padding: 14px 10px;
  border-radius: 8px;
  ${({ theme }) => ({ ...theme.typography.button })};
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;
