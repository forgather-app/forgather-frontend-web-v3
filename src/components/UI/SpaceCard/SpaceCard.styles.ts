import styled from "@emotion/styled";

export const Card = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 4px 8px 4px 4px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  text-align: left;
`;

export const Thumbnail = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  flex-shrink: 0;
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

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  ${({ theme }) => ({ ...theme.typography.caption })};
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
