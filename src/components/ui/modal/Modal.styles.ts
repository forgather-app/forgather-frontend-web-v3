import styled from "@emotion/styled";
import { Backdrop } from "../../../styles/@common/Overlay/Backdrop.styles";

export const ModalRoot = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.layout.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};
  transition: opacity 0.2s ease;
`;

export const Overlay = styled(Backdrop)`
  z-index: 0;
`;

export const Content = styled.div<{ $isVisible: boolean }>`
  position: relative;
  z-index: 1;
  width: 328px;
  background: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 16px;

  transform: scale(${({ $isVisible }) => ($isVisible ? 1 : 0.95)});
  transition: transform 0.2s ease;
`;
