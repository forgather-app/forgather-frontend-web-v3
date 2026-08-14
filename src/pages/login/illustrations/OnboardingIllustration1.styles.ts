import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

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
  background: linear-gradient(180deg, #1b1d1f 12.5%, #111 100%);
  border-radius: 8px;
  padding: 10px 16px;
  box-shadow: 0 2px 4.5px rgba(255, 255, 255, 0.06);
  margin-bottom: 8px;
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

/** 잘리는 하단(GradientFade) 위쪽, 화면에 확실히 보이는 영역에 위치 */
export const PhoneFlower = styled("div", { shouldForwardProp })<{
  $isVisible: boolean;
}>`
  position: absolute;
  top: 100px;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%)
    scale(${({ $isVisible }) => ($isVisible ? 1 : 0)});
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition:
    transform 1s ease,
    opacity 1s ease;

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
