import styled from "@emotion/styled";
import { dissolve, slideIn, slideOut } from "@/styles/animations";
import { shouldForwardProp } from "@/utils/styled";

export const Wrapper = styled("div", { shouldForwardProp })<{
  $isVisible: boolean;
  $hasIcon: boolean;
  $isDissolving: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 328px;
  height: 48px;
  padding: ${({ $hasIcon }) => ($hasIcon ? "12px 16px" : "12px 16px 12px 20px")};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray.gray500};
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.08);
  touch-action: pan-y;
  user-select: none;

  animation: ${({ $isVisible, $isDissolving }) => {
    if ($isVisible) return slideIn;
    if ($isDissolving) return dissolve;
    return slideOut;
  }} 0.3s ease forwards;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  min-width: 0;
`;

export const IconArea = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const Message = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  /* TODO: CloseIcon - X 아이콘 구현 필요 */
`;
