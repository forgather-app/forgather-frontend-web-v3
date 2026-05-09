import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const slideIn = keyframes`
  from {transform: translateY(100%)}
  to{transform: translateY(0%)}
`;

export const Wrapper = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.layout.zIndex.bottomSheet};

  animation: ${({ $isVisible }) => ($isVisible ? slideIn : "none")} 0.3s ease;
`;

// TODO: shouldForwardProp 유틸 함수 사용
export const Container = styled.div`
  width: 100%;
  min-height: 10px;
  padding-top: 10px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: ${({ theme }) => theme.colors.gray.gray700};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const GrabAbleArea = styled.div`
  width: 100%;
  padding: 10px 0 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GrabBar = styled.div`
  width: 40px;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.colors.gray.gray500};
  cursor: grab;
`;

export const Content = styled.div`
  width: 100%;
  max-height: 50dvh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
