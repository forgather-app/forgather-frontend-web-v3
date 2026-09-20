import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";
import { selectableText } from "@/styles/mixins";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  padding: 0 16px;
`;

export const NavWrapper = styled.div`
  position: relative;
`;

export const ScrollArea = styled.div`
  flex: 1;
  min-height: 0;
`;

export const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 24px 0 40px;
`;

export const PhotoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Message = styled.p`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  ${selectableText};
`;

export const SkeletonPhoto = styled.div`
  width: 100%;
  height: 140px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
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
