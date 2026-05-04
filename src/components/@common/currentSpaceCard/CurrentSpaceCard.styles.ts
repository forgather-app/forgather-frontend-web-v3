import styled from "@emotion/styled";

const iconBase = `
  font-size: 16px;
  inline-size: 1em;
  block-size: 1em;
  flex-shrink: 0;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 246px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
`;

export const Thumbnail = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ThumbnailFallback = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.gradient.grayFill};
`;

export const GradientOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120px;
  background: linear-gradient(
    to bottom,
    rgba(37, 41, 48, 0) 0%,
    rgba(37, 41, 48, 0.7) 47.12%,
    ${({ theme }) => theme.colors.gray.gray600} 100%
  );
`;

export const LinkedExhibitionButton = styled.button`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  gap: 4px;
  max-width: 100%;
  padding: 4px 8px;
  border-radius: 8px;
  background: rgba(17, 17, 17, 0.75);
  backdrop-filter: blur(4px);
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const LinkIcon = styled.svg`
  ${iconBase}
`;

export const LinkedExhibitionName = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const SpaceName = styled.h3`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ExhibitionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  overflow: hidden;
`;

export const MetaItem = styled.div`
  ${({ theme }) => ({ ...theme.typography.subBody2 })};
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: ${({ theme }) => theme.colors.gray.gray100};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const LocationIcon = styled.svg`
  ${iconBase}
`;

export const CalendarIcon = styled.svg`
  ${iconBase}
`;

export const ActionGroup = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
`;

export const ActionButton = styled.button`
  ${({ theme }) => ({ ...theme.typography.label })};
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 16px 10px;
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: nowrap;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray.gray500};
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
`;
