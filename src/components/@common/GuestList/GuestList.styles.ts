import styled from "@emotion/styled";

export const Card = styled.button`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  border-radius: 8px;
  text-align: left;
  background: linear-gradient(
    193deg,
    #292d32 6%,
    ${({ theme }) => theme.colors.gray.gray600} 57%
  );
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

export const Nickname = styled.p`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.white};
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
  align-items: flex-start;
  width: 100%;
`;

export const Message = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  /* TODO: 토큰 없음 - line-height 150% (subBody 토큰은 160%) */
  line-height: 150%;
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
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  white-space: nowrap;
`;

export const DetailLink = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  white-space: nowrap;
`;

export const ChevronWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transform: scaleX(-1);
`;
