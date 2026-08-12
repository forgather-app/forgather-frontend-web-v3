import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
`;

export const UserProfile = styled.div`
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

export const MenuWrapper = styled.div`
  position: relative;
`;

export const MoreMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  margin: -6px;
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 29px;
  height: 29px;
  color: ${({ theme }) => theme.colors.gray.white};
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

export const Divider = styled.div`
  height: 8px;
  margin: 24px calc(-1 * ${({ theme }) => theme.layout.sidePadding}px) 0;
  background-color: rgba(17, 17, 17, 0.7);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const AddButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 8px;
  margin: -8px;
  color: ${({ theme }) => theme.colors.gray.gray400};
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

export const EmptyStateTooltipWrapper = styled.div`
  position: absolute;
  /* AddButton은 hit-slop용 -8px margin이 있어, 실제 보이는 버튼 오른쪽 끝에 맞추려면 8px 보정이 필요하다 */
  top: calc(100% + 16px);
  right: -8px;
  width: max-content;
  z-index: ${({ theme }) => theme.layout.zIndex.modalContent};
`;

export const EmptyStateTooltipText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.white};
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

export const ErrorState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const ErrorMessage = styled.p`
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
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
