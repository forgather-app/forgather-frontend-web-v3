import styled from "@emotion/styled";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h3`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.white};
  padding-left: 4px;
`;

export const CarouselWrapper = styled.div`
  overflow: hidden;
  touch-action: pan-y;
  margin: 0 ${({ theme }) => -theme.layout.sidePadding}px;
  padding: 0 ${({ theme }) => theme.layout.sidePadding}px;
`;

export const Track = styled.div<{ currentIndex: number }>`
  display: flex;
  gap: ${({ theme }) => theme.layout.cardGap}px;
  transform: ${({ currentIndex, theme }) =>
    `translateX(calc(${-currentIndex} * (100% + ${theme.layout.cardGap}px)))`};
  transition: transform 0.3s ease;
`;

export const Slide = styled.div`
  flex-shrink: 0;
  width: 100%;
`;

export const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const Dot = styled.button<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray.gray50 : theme.colors.gray.gray500};
`;
