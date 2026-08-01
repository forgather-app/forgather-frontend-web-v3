import styled from "@emotion/styled";
import { subtleFloat } from "@/styles/animations";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PeekLayer = styled("div", { shouldForwardProp })<{
  $depth: number;
}>`
  position: absolute;
  left: ${({ $depth }) => $depth * 10}px;
  right: ${({ $depth }) => $depth * 10}px;
  top: ${({ $depth }) => -$depth * 8}px;
  height: 120px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gradient.purple};
  opacity: ${({ $depth }) => 0.5 - $depth * 0.15};
  animation: ${subtleFloat} ${({ $depth }) => 3 + $depth}s ease-in-out infinite;
  animation-delay: ${({ $depth }) => $depth * 0.4}s;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
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
