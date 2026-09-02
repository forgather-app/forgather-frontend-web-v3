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
  /* TODO: 토큰 없음 - #292D32 (gray600 근사값) */
  background: linear-gradient(
    161deg,
    #292d32 0%,
    ${({ theme }) => theme.colors.gray.gray600} 61%
  );
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  min-height: 24px;
`;

export const Nickname = styled.p`
  ${({ theme }) => ({ ...theme.typography.body2 })};
  /* TODO: 토큰 없음 - Figma Heading 16/SB (line-height 140%) */
  line-height: 140%;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const DateTimeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  /* TODO: 토큰 없음 - Figma Body 14/R (Regular 400, line-height 150%) */
  font-weight: 400;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.gray.gray400};
  white-space: nowrap;
`;

export const DetailLink = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  /* TODO: 토큰 없음 - Figma Body 14/R (Regular 400, line-height 150%) */
  font-weight: 400;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.gray.gray300};
  white-space: nowrap;
`;

export const ChevronWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  & path {
    stroke: ${({ theme }) => theme.colors.gray.gray400};
  }
`;
