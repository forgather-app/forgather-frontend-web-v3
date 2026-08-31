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

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.gray.gray400};
`;

export const MenuWrapper = styled.div`
  position: relative;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 40px;
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
`;

export const VideoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const VideoFrame = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
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

export const ConfirmBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
`;

export const ConfirmTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const ConfirmTitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const ConfirmSubtitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const ConfirmActions = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
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
