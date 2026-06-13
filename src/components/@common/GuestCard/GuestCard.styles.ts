import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { cardFlip, gradientSweep } from "@/styles/animations";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Scene = styled.div`
  width: 100%;
  max-width: 200px;
  height: 184px;
  perspective: 800px;
`;

export const Inner = styled("div", { shouldForwardProp })<{
  $isFlipped: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  ${({ $isFlipped }) =>
    $isFlipped
      ? css`
          animation: ${cardFlip} 0.6s ease forwards;
        `
      : "transform: rotateY(0deg);"}
`;

export const Back = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 8px;
  border: 2px solid transparent;
  background-image: radial-gradient(
      ellipse at center,
      ${({ theme }) => theme.colors.gray.gray700},
      ${({ theme }) => theme.colors.semantic.black}
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.main.purple},
      ${({ theme }) => theme.colors.main.purple100},
      ${({ theme }) => theme.colors.main.purple},
      ${({ theme }) => theme.colors.main.purple100},
      ${({ theme }) => theme.colors.main.purple}
    );
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  background-size: 100% 100%, 300% 100%;
  animation: ${gradientSweep} 20s linear infinite;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  padding: 0 8px;
`;

export const Front = styled("div", { shouldForwardProp })<{
  $isFlip?: boolean;
}>`
  ${({ $isFlip }) =>
    $isFlip &&
    css`
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      transform: rotateY(180deg);
    `}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  width: 100%;
  background: linear-gradient(
    154.57deg,
    #292d32 4.34%,
    ${({ theme }) => theme.colors.gray.gray600} 57.97%
  );
  border: 1px solid rgba(65, 72, 85, 0.8);
  padding-top: 10px;
  padding-bottom: 14px;
`;

export const CardHeader = styled.div`
  // NOTE: 아이콘이 없는 경우를 고려하여 height 고정
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 0 10px;
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;
`;

export const IconButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  &::before {
    content: "";
    position: absolute;
    inset: -8px;
  }
  &:active {
    transform: scale(0.85);
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
`;

export const Author = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Text = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray200};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  max-height: 88px;
`;
