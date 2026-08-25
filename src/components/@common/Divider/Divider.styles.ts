import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Divider = styled("div", { shouldForwardProp })<{
  $color: string;
  $height: number;
  $marginTop: number;
}>`
  flex-shrink: 0;
  height: ${({ $height }) => $height}px;
  margin: ${({ $marginTop }) => $marginTop}px
    calc(-1 * ${({ theme }) => theme.layout.sidePadding}px) 0;
  background-color: ${({ $color }) => $color};
`;
