import styled from "@emotion/styled";

export const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: 100dvh;
  max-height: none;
  margin: auto;
  padding: calc(16px + ${({ theme }) => theme.layout.safeArea.top}) 0
    ${({ theme }) => theme.layout.safeArea.bottom};
  border: 0;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.gray.gray700};
  color: ${({ theme }) => theme.colors.gray.gray100};
  overflow: hidden;

  &[open] { display: flex; flex-direction: column; }
  &::backdrop { background: ${({ theme }) => theme.colors.gray.gray700}; }
`;
export const Navigation = styled.div`
  padding: 0 16px;
  flex-shrink: 0;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 16px 16px;
`;
export const Caption = styled.p`
  margin: 0;
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;
export const Results = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
`;
export const Result = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: calc(100% - 24px);
  min-height: 77px;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray.gray600};
`;
export const Details = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
  overflow-wrap: anywhere;
`;
export const Name = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
`;
export const Address = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;
export const SelectButton = styled.button`
  flex-shrink: 0;
  width: 48px;
  padding: 8px 0;
  background: transparent;
  border: 0;
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #c5baff;
  cursor: pointer;

  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.main.purple}; }
  &:disabled { opacity: 0.5; cursor: default; }
`;
export const RetryButton = styled.button`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  align-self: flex-start;
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.main.purple100};
`;
export const Sentinel = styled.div`
  flex-shrink: 0;
  height: 1px;
`;
