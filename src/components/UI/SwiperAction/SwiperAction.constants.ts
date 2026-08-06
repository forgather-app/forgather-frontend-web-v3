import type { Transition } from "framer-motion";

/** Slide 사이 간격(px). Track의 CSS gap과 위치 계산이 이 값을 공유한다 */
export const CARD_GAP = 6;

/** 다음 슬라이드가 우측에 살짝 보이는 정도(px) */
export const PEEK_WIDTH = 10;

/** click과 drag를 구분하는 최소 이동 거리(px) */
export const MIN_THRESHOLD = 5;

/** 스냅 이동을 트리거하는 드래그 거리 임계값 비율(요소 너비 대비) */
export const THRESHOLD_RATIO = 0.2;

export const SPRING_PRESET: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 32,
  mass: 0.3,
};
