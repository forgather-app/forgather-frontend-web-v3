import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const ScrollWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 0 -${({ theme }) => theme.layout.sidePadding}px;
  padding: 0 ${({ theme }) => theme.layout.sidePadding}px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Header = styled("header", { shouldForwardProp })<{
  $isHidden: boolean;
}>`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  transition: transform 0.3s ease;
  transform: ${({ $isHidden }) =>
    $isHidden ? "translateY(-100%)" : "translateY(0)"};
`;
