import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const flowerPulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.04); }
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
  flex-shrink: 0;
  overflow: hidden;
  display: grid;
  background: linear-gradient(180deg, #1b1d1f 12.5%, #111 100%);
  border-radius: 8px;
  padding: 10px 16px;
  box-shadow: 0 2px 4.5px rgba(255, 255, 255, 0.06);
  margin-bottom: 8px;
`;

/** 모든 메시지를 같은 그리드 셀에 겹쳐 쌓아, 가장 넓은/긴 메시지 기준으로 MessageChip 크기가 자동 결정되도록 함 */
export const ChipText = styled.p<{ $dist: number }>`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  grid-area: 1 / 1;
  color: ${({ theme }) => theme.colors.gray.gray200};
  text-align: center;
  white-space: pre-line;
  transform: translateY(${({ $dist }) => $dist * 100}%);
  opacity: ${({ $dist }) => ($dist === 0 ? 1 : 0)};
  transition:
    transform 0.6s ease,
    opacity 0.6s ease;
`;

export const SceneGroup = styled.div`
  position: relative;
  width: 100%;
  height: 210px;
  overflow: hidden;
`;

/** Layout.Wrapper의 sidePadding(--layout-padding-x)만큼 좌우로 풀브리드 */
export const FlowerCarousel = styled.div`
  position: absolute;
  left: calc(-1 * var(--layout-padding-x));
  right: calc(-1 * var(--layout-padding-x));
  top: 50%;
  transform: translateY(-50%);
  height: 80px;
  overflow: hidden;
  z-index: 1;
`;

export const FlowerItem = styled.div<{ $isCenter: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transition:
    transform 1.5s ease,
    width 1.5s ease,
    height 1.5s ease,
    opacity 0.9s ease;

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

/** Figma node 3785:26160 기준 CSS 폰 목업. 하단은 SceneGroup 밖으로 잘리고 GradientFade로 배경에 자연스럽게 스며든다 */
export const PhoneFrame = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 189px;
  height: 312px;
  border: 8px solid ${({ theme }) => theme.colors.gray.gray500};
  border-radius: 29px;
  background: ${({ theme }) => theme.colors.gray.gray600};
  box-shadow: 0 0 40px 0 ${({ theme }) => theme.colors.semantic.black};
  overflow: hidden;
  z-index: 2;
`;

/** 잘리는 하단(GradientFade) 위쪽, 화면에 확실히 보이는 영역에 위치. 사라지지 않고 계속 pumping */
export const PhoneFlower = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  /* OnboardingIllustration1.tsx의 MESSAGE_INTERVAL(3000ms) 기준 주기와 맞춤 */
  animation: ${flowerPulse} 3s ease-in-out infinite;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

/** 잘린 폰 하단을 배경색(gray700)으로 자연스럽게 페이드아웃. PhoneFlower보다 아래쪽에만 걸리도록 높이를 좁게 유지 */
export const GradientFade = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 70px;
  background: linear-gradient(
    180deg,
    rgba(27, 29, 31, 0) 0%,
    ${({ theme }) => theme.colors.gray.gray700} 100%
  );
  z-index: 3;
  pointer-events: none;
`;
