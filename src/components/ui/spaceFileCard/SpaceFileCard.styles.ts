import styled from "@emotion/styled";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 154px;
  cursor: pointer;
`;

export const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: 133px;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  position: absolute;
  left: 7px;
  top: 0;
  width: 141px;
  height: 126px;
  border-radius: 4px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
`;

export const FileShape = styled.img`
  position: absolute;
  left: 0;
  top: 24px;
  width: 154px;
  height: 109px;
`;

export const BadgeArea = styled.div`
  position: absolute;
  left: 12px;
  top: 95px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
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
  background: ${({ theme }) => theme.colors.gray.gray700};
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

export const NewGuestBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.semantic.alertRed};
`;

export const NewGuestCount = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
