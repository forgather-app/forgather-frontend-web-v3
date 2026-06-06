import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const Top = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 16px 20px;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: pre-line;
`;

export const Body = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
