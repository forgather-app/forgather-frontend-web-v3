import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

interface VariantPalette {
  background: string;
  color: string;
  hoverBackground: string;
  pressedBackground: string;
  disabledBackground: string;
  disabledColor: string;
}

const getVariantPalette = (
  theme: Theme,
  variant: ButtonVariant,
): VariantPalette => {
  switch (variant) {
    case "primary":
      return {
        background: theme.colors.main.purple,
        color: theme.colors.gray.white,
        hoverBackground: theme.colors.button.primaryHover,
        pressedBackground: theme.colors.main.purple,
        disabledBackground: theme.colors.gray.gray500,
        disabledColor: theme.colors.gray.gray400,
      };
    case "secondary":
      return {
        background: theme.colors.main.purple100,
        color: theme.colors.button.secondaryText,
        hoverBackground: theme.colors.button.secondaryHover,
        pressedBackground: theme.colors.main.purple100,
        disabledBackground: theme.colors.gray.gray400,
        disabledColor: theme.colors.gray.gray300,
      };
    case "tertiary":
      return {
        background: theme.colors.gray.white,
        color: theme.colors.semantic.black,
        hoverBackground: theme.colors.button.tertiaryHover,
        pressedBackground: theme.colors.button.tertiaryHover,
        disabledBackground: theme.colors.gray.gray400,
        disabledColor: theme.colors.gray.gray300,
      };
  }
};

export const Button = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  ${({ theme }) => ({ ...theme.typography.button })};
  background-color: ${({ theme, $variant }) => getVariantPalette(theme, $variant).background};
  color: ${({ theme, $variant }) => getVariantPalette(theme, $variant).color};
  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $variant }) => getVariantPalette(theme, $variant).hoverBackground};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme, $variant }) =>
      getVariantPalette(theme, $variant).pressedBackground};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme, $variant }) =>
      getVariantPalette(theme, $variant).disabledBackground};
    color: ${({ theme, $variant }) => getVariantPalette(theme, $variant).disabledColor};
  }
`;
