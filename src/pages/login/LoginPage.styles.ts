import styled from "@emotion/styled";

export const FooterWrapper = styled.div`
  padding: 12px 0;
`;

export const KakaoButton = styled.button`
  width: 100%;
  padding: 14px 16px;
  background-color: #ffe812;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.gray700};
  text-align: center;
`;
