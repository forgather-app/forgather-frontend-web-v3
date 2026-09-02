import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export type PeekDepth = 1 | 2;

export const peekLayerVariants: Record<
  PeekDepth,
  {
    gradient: string;
    top: number;
    left: number;
    right: number;
    height: number;
    rotate: number;
  }
> = {
  1: {
    gradient:
      "linear-gradient(127deg, rgba(89, 75, 250, 1) 0%, rgba(139, 128, 248, 1) 100%)",
    top: -8,
    left: 13,
    right: 2,
    height: 117,
    rotate: -1.3,
  },
  2: {
    gradient:
      "linear-gradient(127deg, rgba(61, 45, 246, 1) 0%, rgba(113, 99, 252, 1) 100%)",
    top: -12,
    left: 3,
    right: 7,
    height: 122,
    rotate: 0.7,
  },
};

export const PeekLayer = styled("div", { shouldForwardProp })<{
  $depth: PeekDepth;
}>`
  position: absolute;
  ${({ $depth }) => {
    const { gradient, top, left, right, height, rotate } =
      peekLayerVariants[$depth];
    return `
      top: ${top}px;
      left: ${left}px;
      right: ${right}px;
      height: ${height}px;
      background: ${gradient};
      transform: rotate(${rotate}deg);
    `;
  }}
  transform-origin: bottom center;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px rgba(17, 17, 17, 0.75);
`;

const CARD_INNER_DEFAULT = "#1E2022";
const CARD_INNER_ACTIVE = "#26292D";

const BORDER_GRADIENT =
  "linear-gradient(127deg, rgba(139, 128, 248, 1) 0%, rgba(89, 75, 250, 1) 100%)";

const cardBackground = (theme: Theme, innerColor: string) => `
  radial-gradient(circle at 50% 63%, ${innerColor} 0%, ${theme.colors.semantic.black} 100%)
    padding-box,
  ${BORDER_GRADIENT} border-box
`;

export const Container = styled("button", { shouldForwardProp })<{
  $stacked: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 120px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: ${({ theme }) => cardBackground(theme, CARD_INNER_DEFAULT)};
  box-shadow: ${({ $stacked }) =>
    $stacked ? "0px 0px 12px 0px rgba(17, 17, 17, 0.75)" : "none"};

  &:hover,
  &:active {
    background: ${({ theme }) => cardBackground(theme, CARD_INNER_ACTIVE)};
  }
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  line-height: 150%;
  color: ${({ theme }) => theme.colors.gray.gray50};
  text-align: center;
`;
