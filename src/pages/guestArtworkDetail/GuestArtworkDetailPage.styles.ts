import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";

export const ScrollArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0 96px;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.heading1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const Artist = styled.p`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const Description = styled.p`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: pre-wrap;
`;

export const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ArtworkImageButton = styled.button`
  display: block;
  width: 100%;
  cursor: pointer;
`;

export const ArtworkImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 16px;
`;

export const VideoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const VideoFrame = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 16px;
`;

export const VideoIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

export const TitleSkeleton = styled.div`
  width: 160px;
  height: 26px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const ArtistSkeleton = styled.div`
  width: 100px;
  height: 20px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const MediaSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const DescriptionSkeleton = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.skeleton.skeleton20};
  background-size: 300% 100%;
  animation: ${gradientSweep} 1.5s linear infinite;
`;

export const ErrorState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const ErrorMessage = styled.p`
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const WriteCtaWrapper = styled.div`
  position: fixed;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  padding: 24px ${({ theme }) => theme.layout.sidePadding}px 0;
  background: linear-gradient(
    0deg,
    ${({ theme }) => theme.colors.gray.gray700} 38%,
    rgba(27, 29, 31, 0) 100%
  );
  z-index: ${({ theme }) => theme.layout.zIndex.bottomSheet};
`;
