import styled from "@emotion/styled";

export const Wrapper = styled.div<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  outline: none;

  &:focus-visible {
    border-radius: 4px;
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.body2 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  user-select: none;
`;

export const Switch = styled.div<{ $checked: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 20px;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.main.purple : theme.colors.gray.gray500};
  padding: 2px;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
`;

export const Thumb = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray.white};
  box-shadow: 0 0 9.72px rgba(0, 0, 0, 0.12);
  transform: translateX(${({ $checked }) => ($checked ? "20px" : "0px")});
  transition: transform 0.2s ease;
`;
