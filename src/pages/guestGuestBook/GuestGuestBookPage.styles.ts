import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const CountGroup = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const CountNumber = styled.span`
  font-weight: 500;
`;

export const CountSkeleton = styled.div`
  width: 132px;
  height: 20px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const GuestListSkeleton = styled.div`
  width: 100%;
  height: 78px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const GuestListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.cardGap}px;
  margin-top: 20px;
`;

export const ScrollSentinel = styled.div`
  height: 1px;
`;

export const PrivateWrapper = styled.div`
  position: relative;
`;

export const BlurredContent = styled.div`
  filter: blur(8px);
  user-select: none;
`;

/** 비공개 방명록 블러 배경용 플레이스홀더. 로딩 스켈레톤과 달리 실제 로딩 상태가 아니므로 애니메이션 없이 정적으로 표시한다 */
export const PrivatePlaceholder = styled.div`
  width: 100%;
  height: 78px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
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
