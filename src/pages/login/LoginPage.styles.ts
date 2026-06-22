import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

export const FooterWrapper = styled.div`
  padding: 12px 0;
`;

export const KakaoButton = styled(Link)`
  width: 100%;
  height: 54px;
  padding: 14px 16px;
  background-color: #ffe812;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  ${({ theme }) => ({ ...theme.typography.button })};
  color: ${({ theme }) => theme.colors.gray.gray700};

  span {
    flex: 1;
    text-align: center;
  }
`;
