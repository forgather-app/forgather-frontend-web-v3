import styled from "@emotion/styled";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray200};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;
