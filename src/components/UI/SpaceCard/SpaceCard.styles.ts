import styled from "@emotion/styled";

export const Card = styled.button<{ $hasGuestBookCount: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: ${({ $hasGuestBookCount }) =>
    $hasGuestBookCount ? "4px 8px 4px 4px" : "4px 16px 4px 4px"};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.gray500};
  }
`;

export const Thumbnail = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  flex-shrink: 0;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 2px;
  flex: 1;
  min-width: 0;
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const Title = styled.p<{ $singleLine: boolean }>`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  padding-left: 2px;
  overflow: hidden;
  ${({ $singleLine }) =>
    $singleLine
      ? `
    text-overflow: ellipsis;
    white-space: nowrap;
  `
      : `
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  `}
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const GuestBadge = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.semantic.black};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.main.purple};
`;

export const GuestBookCount = styled.span`
  /* TODO: 토큰 없음 - Body 14/R (14px/400/line-height 150%) */
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const ChevronWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
