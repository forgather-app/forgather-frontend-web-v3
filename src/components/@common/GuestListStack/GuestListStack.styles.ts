import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export type PeekDepth = 1 | 2;

export const peekLayerVariants: Record<
  PeekDepth,
  { gradient: string; rotate: number; top: number }
> = {
  1: {
    gradient:
      "linear-gradient(115deg, rgba(89, 75, 250, 1), rgba(61, 45, 246, 1))",
    rotate: 2,
    top: -6,
  },
  2: {
    gradient:
      "linear-gradient(115deg, rgba(61, 45, 246, 1), rgba(43, 28, 200, 1))",
    rotate: -2,
    top: -11,
  },
};

export const PeekLayer = styled(motion.div, { shouldForwardProp })<{
  $depth: PeekDepth;
}>`
  position: absolute;
  left: 4px;
  right: 4px;
  height: 120px;
  border-radius: 8px;
  background: ${({ $depth }) => peekLayerVariants[$depth].gradient};
  /* semantic.black(#111111) 75% opacity */
  box-shadow: 0px 0px 12px 0px rgba(17, 17, 17, 0.75);
`;

export const Container = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 120px;
  border-radius: 8px;
  border: 1px solid #8b80f8;
  background: radial-gradient(
    ellipse at center,
    #1e2022 0%,
    ${({ theme }) => theme.colors.semantic.black} 100%
  );
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  /* TODO: 토큰 없음 - line-height 150% (subBody 토큰은 160%) */
  line-height: 150%;
  color: ${({ theme }) => theme.colors.gray.white};
  text-align: center;
`;
