import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

/** animation의 transform이 static transform을 완전히 덮어써서, 최종 위치(40px)를 keyframe 안에 직접 반영 */
const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(40px); }
`;

const drawLine = keyframes`
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
`;

/** Inner 등장 → Outer가 Inner 위에 추가 등장(Inner는 유지) → 둘 다 같이 빠르게 소멸, 반복 */
const auraInnerFade = keyframes`
  0%, 15%, 100% { opacity: 0; }
  25%, 75% { opacity: 1; }
  79% { opacity: 0; }
`;

const auraOuterFade = keyframes`
  0%, 35%, 100% { opacity: 0; }
  45%, 75% { opacity: 1; }
  79% { opacity: 0; }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 16px;
`;

export const TagWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive: boolean }>`
  position: relative;
  z-index: 1;
  opacity: 0;

  ${({ $isActive }) =>
    $isActive &&
    css`
      animation: ${fadeDown} 0.4s ease 0.9s forwards;
    `}
`;

export const TagAuraOuter = styled("div", {
  shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive: boolean }>`
  position: absolute;
  /* Figma node 3795:47101 - Rectangle 240652096 기준 (Tag 박스 대비 인셋) */
  inset: -40px -51px;
  z-index: 0;
  border-radius: 999px;
  background: rgba(98, 71, 255, 0.1);
  opacity: 0;
  pointer-events: none;

  ${({ $isActive }) =>
    $isActive &&
    css`
      animation: ${auraOuterFade} 4s ease-in-out 1.3s infinite;
    `}
`;

export const TagAuraInner = styled("div", {
  shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive: boolean }>`
  position: absolute;
  /* Figma node 3795:47101 - Rectangle 240652095 기준 (Tag 박스 대비 인셋) */
  inset: -17px -21px;
  z-index: 0;
  border-radius: 999px;
  background: rgba(98, 71, 255, 0.1);
  opacity: 0;
  pointer-events: none;

  ${({ $isActive }) =>
    $isActive &&
    css`
      animation: ${auraInnerFade} 4s ease-in-out 1.3s infinite;
    `}
`;

export const Tag = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13.2px 17.6px;
  background: #302a63;
  border: 1.1px solid ${({ theme }) => theme.colors.main.purple50};
  border-radius: 62px;
  white-space: nowrap;
`;

export const TagIcon = styled.span`
  display: flex;
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.main.purple50};
    stroke: ${({ theme }) => theme.colors.main.purple50};
  }
`;

export const TagText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: #c5baff;
`;

export const LinesContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive: boolean }>`
  width: 100%;
  height: 30px;
  flex-shrink: 0;
  margin-top: 36px;

  path {
    fill: none;
    stroke-dashoffset: 1;

    ${({ $isActive }) =>
      $isActive &&
      css`
        animation: ${drawLine} 0.6s ease 0.3s forwards;
      `}
  }
`;

export const PeopleRow = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  gap: 12px;
`;

export const PersonItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const HumanWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive: boolean }>`
  flex: 1;
  width: 100%;
  min-height: 0;
  opacity: 0;

  svg {
    width: 100%;
    height: 100%;
    display: block;
    /* svg 비율과 컨테이너 비율이 달라 생기는 머리 위 여백을 살짝 줄임 */
    margin-top: -8px;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      animation: ${slideUp} 0.5s ease 0.2s forwards;
    `}
`;
