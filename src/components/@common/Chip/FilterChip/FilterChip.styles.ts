import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

const selectedStyle = (theme: Theme) => css`
  background-color: rgba(98, 71, 255, 0.25);
  border-color: ${theme.colors.main.purple};
  color: ${theme.colors.gray.gray100};
`;

const defaultStyle = (theme: Theme) => css`
  background-color: transparent;
  border-color: ${theme.colors.gray.gray500};
  color: ${theme.colors.gray.gray400};
`;

export const Chip = styled("button", { shouldForwardProp })<{
  $isSelected: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border: 1px solid;
  border-radius: 20px;
  white-space: nowrap;
  ${({ theme }) => ({ ...theme.typography.label })};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  ${({ theme, $isSelected }) => ($isSelected ? selectedStyle(theme) : defaultStyle(theme))}
`;
