import styled from "@emotion/styled";

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding-top: 24px;
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const CountGroup = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const CountNumber = styled.span`
  font-weight: 500;
`;

export const GuestCardWrapper = styled.div`
  margin-top: 28px;
`;

export const GuestListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.cardGap}px;
  margin-top: 20px;
`;

export const BottomSpacer = styled.div`
  position: sticky;
  bottom: 0;
  flex-shrink: 0;
  height: 34px;
  background: linear-gradient(
    180deg,
    rgba(27, 29, 31, 0) 0%,
    ${({ theme }) => theme.colors.gray.gray700} 50%
  );
  pointer-events: none;
`;

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
  width: 44px;
  height: 44px;
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
