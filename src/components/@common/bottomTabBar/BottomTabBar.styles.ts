import styled from "@emotion/styled";

export const Wrapper = styled.nav`
  width: 100%;
  padding-bottom: 34px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px 8px 0 0;
  border-top: 0.75px solid ${({ theme }) => theme.colors.gray.gray500};
  display: flex;
  flex-direction: column;
`;

export const TabList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.gray.white : theme.colors.gray.gray300};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const TabLabel = styled.span`
  /* TODO: 토큰 없음 - fontWeight: 500, fontSize: 12px, lineHeight: 1.4167em, letterSpacing: -0.5px */
  font-weight: 500;
  font-size: 12px;
  line-height: 1.4167em;
  letter-spacing: -0.5px;
  text-align: center;
  color: inherit;
`;

export const HomeIndicatorArea = styled.div`
  width: 100%;
  height: 34px;
  position: relative;
`;

export const HomeIndicatorPill = styled.div`
  width: 134px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.gray.white};
  border-radius: 100px;
  position: absolute;
  top: 21px;
  left: 50%;
  transform: translateX(-50%);
`;
