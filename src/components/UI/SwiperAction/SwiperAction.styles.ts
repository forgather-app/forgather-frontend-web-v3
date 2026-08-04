import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CARD_GAP } from "./SwiperAction.constants";

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
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
