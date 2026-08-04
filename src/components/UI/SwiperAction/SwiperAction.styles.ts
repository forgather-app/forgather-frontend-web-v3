import styled from "@emotion/styled";
import { motion } from "framer-motion";

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
`;

export const Slide = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;
  width: ${({ theme }) =>
    `calc(${theme.layout.maxWidth} - ${theme.layout.sidePadding}px * 2)`};
`;
