import styled from "@emotion/styled";
import { shouldForwardProp } from "../../../utils/styled";
import { containerLayout } from "./ExhibitionList.common.styles";

type ButtonContainerProps = { $isSelected?: boolean };

export const ButtonContainer = styled("button", {
  shouldForwardProp,
})<ButtonContainerProps>`
  ${containerLayout}

  appearance: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;

  ${({ theme, $isSelected }) =>
    $isSelected
      ? `
        background-color: ${theme.colors.gray.gray500};
        border: none;
      `
      : `
        background: linear-gradient(172.26deg, #292d32 4.34%, #252930 57.97%);
        border: 1px solid rgba(65, 72, 85, 0.8);
      `}
`;
