import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { cardFlip } from "@/styles/animations";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Scene = styled.div`
  position: relative;
  width: 100%;
`;

export const Inner = styled("div", { shouldForwardProp })<{
  $isFlipped: boolean;
}>`
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  ${({ $isFlipped }) =>
    $isFlipped
      ? css`
          animation: ${cardFlip} 0.6s ease forwards;
        `
      : "transform: rotateY(0deg);"}
`;

const cardBase = css`
  width: 100%;
  border-radius: 24px;
  background: linear-gradient(to bottom, #1b1d1f 12.5%, #111111);
  box-shadow: 0px 12px 20px rgba(255, 255, 255, 0.15);
`;

export const NewFace = styled.div`
  ${cardBase};
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 32px 24px 28px;
  cursor: pointer;
`;

export const NewBadge = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray400};
  position: absolute;
  top: 24px;
  right: 24px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: baseline;
`;

export const TeaserAuthor = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const TeaserSuffix = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const ContentFace = styled("div", { shouldForwardProp })<{
  $isFlip?: boolean;
}>`
  ${cardBase};
  ${({ $isFlip }) =>
    $isFlip &&
    css`
      backface-visibility: hidden;
      transform: rotateY(180deg);
    `}
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PhotoArea = styled.div`
  position: relative;
  height: 140px;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  flex-shrink: 0;
`;

export const Photo = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PhotoBadge = styled.div`
  position: absolute;
  bottom: 8px;
  left: 10px;
  background: rgba(17, 17, 17, 0.75);
  padding: 4px 8px;
  border-radius: 50px;
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: nowrap;
`;

export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 24px 28px;
`;

export const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AuthorName = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  &:active{
    transform: scale(0.85)
  }
`;

export const DateText = styled.p`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray400};
  white-space: nowrap;
`;

export const BodyText = styled.p`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  max-height: 286px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
`;
