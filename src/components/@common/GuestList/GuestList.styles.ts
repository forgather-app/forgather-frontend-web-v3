import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Card = styled("button", { shouldForwardProp })<{
  $hasPhoto: boolean;
}>`
  display: flex;
  flex-direction: column;
  /* Figma: 사진 있을 때 8px, 없을 때 12px */
  gap: ${({ $hasPhoto }) => ($hasPhoto ? 8 : 12)}px;
  align-items: stretch;
  width: 100%;
  padding: 16px 20px;
  border-radius: 8px;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  min-height: 24px;
`;

export const NicknameGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

export const NewBadge = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.main.purple50};
  flex-shrink: 0;
`;

export const Nickname = styled.p`
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PhotoIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: stretch;
  width: 100%;
`;

export const Message = styled.p`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  width: 100%;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const DateTimeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray400};
  white-space: nowrap;
`;
