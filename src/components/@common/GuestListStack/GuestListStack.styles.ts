import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export type PeekDepth = 1 | 2;

// 회전이 걸린 상태를 유지하며 은은하게 떠오르는 애니메이션 (rotate가 있으면 공용 keyframe으로는 표현 불가)
// 모듈 로드 시 한 번만 생성 — styled-component 렌더 콜백 안에서 호출하면 리렌더마다 keyframes가 새로 생성되어 애니메이션이 매번 리셋됨
const subtleFloatAtAngle = (rotate: number) => keyframes`
  0%, 100% { transform: rotate(${rotate}deg) translateY(0) scale(1); }
  50% { transform: rotate(${rotate}deg) translateY(-3px) scale(1.015); }
`;

const peekLayerVariants: Record<
  PeekDepth,
  {
    gradient: string;
    rotate: number;
    top: string;
    animation: ReturnType<typeof keyframes>;
  }
> = {
  1: {
    gradient:
      "linear-gradient(115deg, rgba(89, 75, 250, 1), rgba(61, 45, 246, 1))",
    rotate: -1.5,
    top: "-6px",
    animation: subtleFloatAtAngle(-1.5),
  },
  2: {
    gradient:
      "linear-gradient(115deg, rgba(61, 45, 246, 1), rgba(43, 28, 200, 1))",
    rotate: -3,
    top: "-11px",
    animation: subtleFloatAtAngle(-3),
  },
};

export const PeekLayer = styled("div", { shouldForwardProp })<{
  $depth: PeekDepth;
}>`
  position: absolute;
  left: 4px;
  right: 4px;
  height: 120px;
  border-radius: 8px;
  top: ${({ $depth }) => peekLayerVariants[$depth].top};
  background: ${({ $depth }) => peekLayerVariants[$depth].gradient};
  transform-origin: bottom center;
  animation: ${({ $depth }) => peekLayerVariants[$depth].animation}
    ${({ $depth }) => 3 + $depth}s ease-in-out infinite;
  animation-delay: ${({ $depth }) => $depth * 0.4}s;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(${({ $depth }) => peekLayerVariants[$depth].rotate}deg);
  }
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
