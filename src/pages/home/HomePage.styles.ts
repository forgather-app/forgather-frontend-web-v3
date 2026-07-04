import styled from "@emotion/styled";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  overflow: hidden;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 16px;

  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px 0 8px;
`;

export const UserGreeting = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #d9d9d9;
  flex-shrink: 0;
`;

export const UserTextWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const UserName = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const GreetingText = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading3 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 160px;
`;

export const ContentHeader = styled.div`
  display: flex;
  gap: 2px;
  align-items: baseline;
  padding: 8px 0 0 2px;
`;

export const SpaceCount = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody2 })};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const SpaceCountText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const SpaceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BottomSection = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const CreateButtonContainer = styled.div`
  position: absolute;
  bottom: calc(100% + 16px);
  right: 16px;
  z-index: ${({ theme }) => theme.layout.zIndex.modal};
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.gray.white};
  color: ${({ theme }) => theme.colors.gray.gray600};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
  transition: all 0.15s ease;

  &:active:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray.gray500};
    color: ${({ theme }) => theme.colors.gray.gray400};
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }
`;

export const CreateButtonText = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
`;
