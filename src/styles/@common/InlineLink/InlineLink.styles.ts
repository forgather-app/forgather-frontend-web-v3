import styled from "@emotion/styled";

export const InlineLink = styled.a`
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-decoration: underline;
  word-break: break-all;
`;
