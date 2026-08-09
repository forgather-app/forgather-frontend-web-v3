import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 0 0 24px;
  background: radial-gradient(
    ellipse at bottom,
    ${({ theme }) => theme.colors.gray.gray600} 0%,
    ${({ theme }) => theme.colors.gray.gray700} 70%
  );
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 4px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  color: ${({ theme }) => theme.colors.gray.gray100};

  &:disabled {
    opacity: 0.4;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }
`;

export const MirroredIcon = styled.span`
  display: flex;
  transform: scaleX(-1);
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 0;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: nowrap;
`;

export const Nickname = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
`;

export const TitleSuffix = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading3 })};
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  white-space: nowrap;
`;

export const Divider = styled.span`
  width: 1px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.gray.gray400};
`;
