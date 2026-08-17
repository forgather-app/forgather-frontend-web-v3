import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
`;

export const Track = styled.div<{ currentIndex: number }>`
  display: flex;
  align-items: flex-start;
  transform: translateX(${({ currentIndex }) => -currentIndex * 100}%);
  transition: transform 0.3s ease;
`;

export const Slide = styled.div`
  flex-shrink: 0;
  width: 100%;
`;

export const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray.gray50 : theme.colors.gray.gray500};
`;
