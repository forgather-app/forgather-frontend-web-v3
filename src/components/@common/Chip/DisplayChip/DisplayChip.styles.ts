import styled from "@emotion/styled";

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: nowrap;
`;
