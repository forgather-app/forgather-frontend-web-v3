import styled from "@emotion/styled";

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody2 })};
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: nowrap;
  vertical-align: middle;
`;
