import styled from "@emotion/styled";

export const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  overflow: hidden;
  gap: 32px;
`;

export const Viewport = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  touch-action: pan-y;
`;

export const DotsWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 24px 0;
  flex-shrink: 0;
`;

export const Dot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray.white : theme.colors.gray.gray500};
`;

export const Track = styled.div<{ currentIndex: number }>`
  display: flex;
  height: 100%;
  transform: translateX(${({ currentIndex }) => -currentIndex * 100}%);
  transition: transform 0.3s ease;
  align-items: start;
  justify-content: flex-start;
`;

export const Slide = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

export const Footer = styled.footer`
  flex-shrink: 0;
`;
