import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const slideIn = keyframes`
  from {transform: translateY(100%)}
  to{transform: translateY(0%)}
`;

const slideOut = keyframes`
  from {transform: translateY(0%)}
  to{transform: translateY(100%)}
`;

export const Wrapper = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.layout.zIndex.bottomSheet};

  animation: ${({ $isVisible }) => ($isVisible ? slideIn : slideOut)} 0.3s ease;
  animation-fill-mode: forwards;
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

export const GrabBar = styled.div`
  width: 40px;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.colors.gray.gray500};
  cursor: grab;
`;
