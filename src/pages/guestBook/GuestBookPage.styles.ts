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
  padding-top: 24px;
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

export const GuestCardWrapper = styled.div`
  margin-top: 28px;
`;

export const GuestListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.cardGap}px;
  margin-top: 20px;
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
