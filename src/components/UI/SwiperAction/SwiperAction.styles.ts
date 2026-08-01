import styled from "@emotion/styled";
import { motion } from "framer-motion";

/** Slide 사이 간격(px). Track의 CSS gap과 SwiperAction.tsx의 위치 계산이 이 값을 공유한다 */
export const CARD_GAP = 6;

/** 다음 슬라이드가 우측에 살짝 보이는 정도(px) */
export const PEEK_WIDTH = 20;

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  touch-action: none;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const Track = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${CARD_GAP}px;
`;

export const Slide = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
  user-select: none;
`;
