import styled from "@emotion/styled";

export const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  overflow: hidden;
`;

export const Viewport = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const DotsWrapper = styled.div`
  position: absolute;
  top: 24px;
  left: 0;
  display: flex;
  gap: 8px;
  z-index: 1;
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
`;

export const Slide = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

export const Footer = styled.footer`
  flex-shrink: 0;
`;
