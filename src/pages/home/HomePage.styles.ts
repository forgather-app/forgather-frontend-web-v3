import styled from "@emotion/styled";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import { gradientSweep } from "@/styles/animations";
import { selectableText } from "@/styles/mixins";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  overflow: hidden;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0 0;
`;

export const UserProfile = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.semantic.black};
  flex-shrink: 0;
`;

export const UserAvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const UserName = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.white};
  ${selectableText};
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const PlusIcon = styled(IcPlus)`
  path {
    stroke: ${({ theme }) => theme.colors.gray.gray200};
  }
`;

export const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0 40px;
`;

export const MySpaceSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  padding-left: 2px;
  margin-bottom: 16px;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
  margin-bottom: 12px;
`;

export const SpaceCountGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const SpaceCount = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const SpaceCountText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  /* TODO: 토큰 없음 - 14px/400 */
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const SortLabel = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const SpaceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BottomCta = styled.div`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const CurrentSpaceSkeleton = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const CurrentSpaceActionsSkeleton = styled.div`
  width: 100%;
  height: 52px;
  margin-top: 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const SpaceCardSkeleton = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;
