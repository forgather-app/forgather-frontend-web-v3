import styled from "@emotion/styled";

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex: 1;
  padding: 40px 0;
`;

export const StatusText = styled.p`
  ${({ theme }) => ({ ...theme.typography.body2 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-align: center;
`;
