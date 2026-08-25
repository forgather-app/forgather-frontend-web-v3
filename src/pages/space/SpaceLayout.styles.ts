import styled from "@emotion/styled";

export const BottomBar = styled.div`
  position: fixed;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  padding: 0 24px;
  z-index: ${({ theme }) => theme.layout.zIndex.bottomSheet};
`;

export const FloatingIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  box-shadow: 0px 0px 20px 0px rgba(17, 17, 17, 0.75);
  color: ${({ theme }) => theme.colors.gray.gray200};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }
`;
