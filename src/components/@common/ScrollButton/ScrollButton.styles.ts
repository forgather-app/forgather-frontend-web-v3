import styled from "@emotion/styled";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 10px 8px 12px;
  border: none;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.gray.white};
  color: ${({ theme }) => theme.colors.semantic.black};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.gray50};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
`;

export const Icon = styled.img<{ src: string }>`
  display: block;
  width: 20px;
  height: 20px;
`;
