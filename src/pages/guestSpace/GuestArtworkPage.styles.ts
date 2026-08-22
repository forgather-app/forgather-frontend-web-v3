import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 0 calc(-1 * ${({ theme }) => theme.layout.sidePadding}px);
  padding: 0 ${({ theme }) => theme.layout.sidePadding}px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.semantic.black};
  flex-shrink: 0;
`;

export const UserAvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const UserName = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 28px;
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const SpaceLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-decoration: underline;
`;

export const DescriptionRow = styled("div", { shouldForwardProp })<{
  $isExpanded: boolean;
}>`
  display: flex;
  flex-direction: ${({ $isExpanded }) => ($isExpanded ? "column" : "row")};
  align-items: flex-end;
  gap: 4px;
  margin-top: 16px;
`;

export const Description = styled("p", { shouldForwardProp })<{
  $isExpanded: boolean;
}>`
  flex: 1;
  width: 100%;
  min-width: 0;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $isExpanded }) => ($isExpanded ? "unset" : 2)};
  -webkit-box-orient: vertical;
`;

export const MoreButton = styled.button`
  flex-shrink: 0;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 64px 0;
`;

export const EmptyStateGraphic = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;

  svg {
    width: 60%;
    height: 60%;
  }
`;

export const EmptyStateText = styled.p`
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-align: center;
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
`;

export const CardSkeleton = styled.div`
  width: 100%;
  height: 276px;
  flex-shrink: 0;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const TitleSkeleton = styled.div`
  width: 160px;
  height: 29px;
  margin-top: 24px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const DescriptionSkeleton = styled.div`
  width: 100%;
  height: 44px;
  margin-top: 16px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const BottomSpacer = styled.div`
  position: sticky;
  bottom: 0;
  flex-shrink: 0;
  height: 34px;
  background: linear-gradient(
    180deg,
    rgba(27, 29, 31, 0) 0%,
    ${({ theme }) => theme.colors.gray.gray700} 50%
  );
  pointer-events: none;
`;
