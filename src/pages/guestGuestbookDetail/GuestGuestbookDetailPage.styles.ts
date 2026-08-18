import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const DetailHeaderWrapper = styled.div`
  margin-top: 24px;
`;

export const ScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px 0 96px;
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

export const BottomBar = styled.div`
  position: fixed;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  z-index: ${({ theme }) => theme.layout.zIndex.bottomSheet};
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  color: ${({ theme }) => theme.colors.gray.white};
  ${({ theme }) => ({ ...theme.typography.label })};
  box-shadow: 0px 0px 20px 0px rgba(17, 17, 17, 0.75);
`;
