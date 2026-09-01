import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";
import { selectableText } from "@/styles/mixins";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  // NOTE: 좌우 끝까지 이어지도록 수정
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
  justify-content: space-between;
  padding-top: 24px;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserName = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  ${selectableText};
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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
  color: ${({ theme }) => theme.colors.gray.gray400};
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
  ${selectableText};
`;

export const SpaceLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-decoration: underline;
  ${selectableText};
`;

export const DescriptionRow = styled("div", { shouldForwardProp })<{
  $isExpanded: boolean;
}>`
  display: flex;
  flex-direction: ${({ $isExpanded }) => ($isExpanded ? "column" : "row")};
  align-items: flex-end;
  gap: 4px;
  margin-top: 24px;
`;

export const Description = styled("p", { shouldForwardProp })<{
  $isExpanded: boolean;
}>`
  flex: 1;
  width: 100%;
  min-width: 0;
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $isExpanded }) => ($isExpanded ? "unset" : 2)};
  -webkit-box-orient: vertical;
  ${selectableText};
`;

export const MoreButton = styled.button`
  flex-shrink: 0;
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
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

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 8px;
  margin: -8px;
  color: ${({ theme }) => theme.colors.gray.gray400};
`;

export const EmptyState = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 262px;
  margin-top: 16px;
  border-radius: 8px;
`;

export const EmptyStateBorder = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const EmptyStateBorderRect = styled.rect`
  fill: none;
  stroke: ${({ theme }) => theme.colors.gray.gray500};
  stroke-width: 1;
  stroke-dasharray: 4 4;
  stroke-linecap: round;
`;

export const EmptyStateIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14.4px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const EmptyStateText = styled.p`
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-align: center;
`;

export const CarouselWrapper = styled("div", { shouldForwardProp })<{
  $fullBleed?: boolean;
}>`
  margin-top: 16px;
  ${({ $fullBleed, theme }) =>
    $fullBleed &&
    `
    margin-left: calc(-1 * ${theme.layout.sidePadding}px);
    margin-right: calc(-1 * ${theme.layout.sidePadding}px);
  `}
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

export const ConfirmBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
`;

export const ConfirmTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const ConfirmTitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const ConfirmSubtitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const ConfirmActions = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
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
