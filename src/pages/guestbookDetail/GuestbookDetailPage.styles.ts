import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  padding: 0 16px;
`;

export const ScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px 0 40px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;

export const Message = styled.p`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const SkeletonPhoto = styled.div`
  width: 100%;
  height: 140px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;
