import styled from "@emotion/styled";

export const Container = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 120px;
  border-radius: 8px;
  border: 1px solid #8b80f8;
  background: radial-gradient(
    ellipse at center,
    #1e2022 0%,
    ${({ theme }) => theme.colors.semantic.black} 100%
  );
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  /* TODO: 토큰 없음 - line-height 150% (subBody 토큰은 160%) */
  line-height: 150%;
  color: ${({ theme }) => theme.colors.gray.white};
  text-align: center;
`;
