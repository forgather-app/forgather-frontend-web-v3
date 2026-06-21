import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const pulse = keyframes`
  0%, 100% { transform: translate(-50%, 0) scale(1); }
  50% { transform: translate(-50%, 0) scale(1.06); }
`;

const ringPulse = keyframes`
  0%, 100% { transform: translate(-50%, 0) scale(1); opacity: 0.35; }
  50% { transform: translate(-50%, 0) scale(1.06); opacity: 0.6; }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const MessageChip = styled.div`
  position: relative;
  z-index: 1;
  background: linear-gradient(180deg, #1b1d1f 12.5%, #111 100%);
  border-radius: 8px;
  padding: 10px 16px;
  box-shadow: 0 2px 4.5px rgba(255, 255, 255, 0.06);
  margin-bottom: -20px;
`;

export const ChipText = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray200};
  text-align: center;
  white-space: pre-line;
`;

export const SceneGroup = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

/** 흰 원 바깥쪽 링 */
export const Ring = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 222px;
  height: 222px;
  margin-top: -11px;
  border-radius: 50%;
  border: 2px solid rgba(180, 175, 220, 0.35);
  z-index: 0;
  transform: translate(-50%, 0);
  animation:
    ${ringPulse} 3s ease-in-out 0.8s infinite;
`;

export const Circle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid rgba(140, 135, 180, 0.3);
  z-index: 0;
  transform: translate(-50%, 0);
  animation:
    ${pulse} 3s ease-in-out 0.8s infinite;
`;

export const FlowerCarousel = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 43%;
  height: 80px;
  overflow: hidden;
  z-index: 1;
`;

export const FlowerItem = styled.div<{ $isCenter: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transition:
    transform 0.5s ease,
    width 0.5s ease,
    height 0.5s ease,
    opacity 0.3s ease;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  ${({ $isCenter }) =>
    !$isCenter &&
    css`
      svg * {
        fill: rgba(137, 116, 255, 1);
      }
    `}
`;

export const Character = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  z-index: 2;

  svg {
    width: 100%;
    height: 100%;
  }
`;
