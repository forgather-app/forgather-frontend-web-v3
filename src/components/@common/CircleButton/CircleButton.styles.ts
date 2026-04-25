import styled from "@emotion/styled";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.colors.gray.white};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }
`;
