import styled from "@emotion/styled";

export const BackgroundImage = styled.img`
  display: block;
  width: 100%;
  height: 120px;
  object-fit: cover;
  object-position: center;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: var(--content-bg, linear-gradient(152deg, rgba(41, 45, 50, 1) 22%, rgba(37, 41, 48, 1) 55%));
`;

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ExhibitionLink = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
  min-width: 0;
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const ExhibitionName = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray200};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const GuestBadge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: 55px;
  height: 26px;
  padding: 4px 8px 4px 0;
  border-radius: 50px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--guest-badge-bg, ${({ theme }) => theme.colors.gray.gray700});
`;

export const GuestAvatarGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const GuestAvatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.semantic.black};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.main.purple};
`;

export const GuestCount = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const PinButton = styled.button<{ $isPinned: boolean }>`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 32px;
  height: 32px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;

  svg path {
    fill: ${({ $isPinned, theme }) =>
      $isPinned ? theme.colors.gray.white : theme.colors.semantic.black};
  }
`;

export const Card = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:active:not(:has(button:active)) {
    --content-bg: ${({ theme }) => theme.colors.gray.gray500};
    --guest-badge-bg: ${({ theme }) => theme.colors.gray.gray600};
  }
`;
