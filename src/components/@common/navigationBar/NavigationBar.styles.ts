import styled from "@emotion/styled";

interface WrapperProps {
  $hasBothIcons: boolean;
  $hasOnlyRightIcon: boolean;
}

export const Wrapper = styled.nav<WrapperProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  /* TODO: 토큰 없음 - padding-top: 4px */
  padding-top: 4px;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  justify-content: ${({ $hasBothIcons, $hasOnlyRightIcon }) => {
    if ($hasBothIcons) return "space-between";
    if ($hasOnlyRightIcon) return "flex-end";
    return "flex-start";
  }};
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  /* TODO: 토큰 없음 - padding: 8px */
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray.gray100};
  flex-shrink: 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const Title = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading3 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  pointer-events: none;
`;
