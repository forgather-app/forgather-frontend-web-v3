import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 0 16px;
`;

export const Indicator = styled.div<{ isRightActive: boolean }>`
  position: absolute;
  bottom: 0;
  left: 16px;
  width: calc(50% - 16px);
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray.gray300};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ isRightActive }) => (isRightActive ? "translateX(100%)" : "translateX(0)")};
  pointer-events: none;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 0 16px 4px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray500};
  background: transparent;
  cursor: pointer;
  ${({ theme }) => ({ ...theme.typography.heading3 })};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray.white : theme.colors.gray.gray300};
  transition: color 0.3s ease;
`;
