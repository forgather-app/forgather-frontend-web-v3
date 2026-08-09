import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CARD_GAP } from "./SwiperAction.constants";

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  /* 세로 스크롤은 브라우저 기본 동작에 맡기고, 가로 드래그만 JS로 판별합니다 */
  touch-action: pan-y;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const Track = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${CARD_GAP}px;
`;

export const Slide = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
  user-select: none;
  height: 100%;
`;
