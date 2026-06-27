import styled from "@emotion/styled";

export const FooterWrapper = styled.div`
  padding: 12px 0;
`;

export const KakaoButton = styled.button`
  width: 100%;
  height: 54px;
  padding: 14px 16px;
  background-color: #ffe812;
  border-radius: 8px;
  display: flex;
  align-items: center;
  ${({ theme }) => ({ ...theme.typography.button })};
  color: ${({ theme }) => theme.colors.gray.gray700};

  span {
    flex: 1;
    text-align: center;
  }
`;
