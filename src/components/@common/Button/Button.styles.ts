import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "underlined"
  | "pill"
  | "pillWeak"
  | "action"
  | "icon";

const variantStyles: Record<ButtonVariant, (theme: Theme) => string> = {
  primary: (theme) => `
    background-color: ${theme.colors.main.purple};
    color: ${theme.colors.gray.white};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.button.primaryHover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.main.purple};
    }

    &:disabled {
      background-color: ${theme.colors.gray.gray500};
      color: ${theme.colors.gray.gray400};
    }
  `,
  secondary: (theme) => `
    background-color: ${theme.colors.main.purple100};
    color: ${theme.colors.button.secondaryText};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.button.secondaryHover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.main.purple100};
    }

    &:disabled {
      background-color: ${theme.colors.gray.gray400};
      color: ${theme.colors.gray.gray300};
    }
  `,
  tertiary: (theme) => `
    background-color: ${theme.colors.gray.white};
    color: ${theme.colors.semantic.black};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.button.tertiaryHover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.button.tertiaryHover};
    }

    &:disabled {
      background-color: ${theme.colors.gray.gray400};
      color: ${theme.colors.gray.gray300};
    }
  `,
  underlined: (theme) => `
    padding: 0;
    width: auto;
    background-color: transparent;
    text-decoration: underline;
    text-underline-offset: 2px;
    font-weight: ${theme.typography.label.fontWeight};
    font-size: ${theme.typography.label.fontSize};
    line-height: ${theme.typography.label.lineHeight};
    letter-spacing: ${theme.typography.label.letterSpacing};
    color: ${theme.colors.gray.gray200};
    transition: none;

    &:focus-visible {
      border-radius: 2px;
    }
  `,
  pill: (theme) => `
    width: auto;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: ${theme.typography.label.fontWeight};
    font-size: ${theme.typography.label.fontSize};
    line-height: ${theme.typography.label.lineHeight};
    letter-spacing: ${theme.typography.label.letterSpacing};
    background-color: ${theme.colors.gray.white};
    color: ${theme.colors.gray.gray600};

    &:disabled {
      background-color: ${theme.colors.gray.gray600};
      color: ${theme.colors.gray.gray300};
    }
  `,
  pillWeak: (theme) => `
    width: auto;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: ${theme.typography.label.fontWeight};
    font-size: ${theme.typography.label.fontSize};
    line-height: ${theme.typography.label.lineHeight};
    letter-spacing: ${theme.typography.label.letterSpacing};
    background-color: ${theme.colors.gray.white};
    color: ${theme.colors.gray.gray600};

    &:disabled {
      background-color: ${theme.colors.gray.gray500};
      color: ${theme.colors.gray.gray200};
    }
  `,
  action: (theme) => `
    width: auto;
    padding: 8px 16px;
    border-radius: 20px;
    gap: 4px;
    font-weight: ${theme.typography.body3.fontWeight};
    font-size: ${theme.typography.body3.fontSize};
    line-height: ${theme.typography.body3.lineHeight};
    letter-spacing: ${theme.typography.body3.letterSpacing};
    background-color: ${theme.colors.main.purple};
    color: ${theme.colors.gray.white};
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.25);

    &:disabled {
      background-color: ${theme.colors.gray.gray500};
      color: ${theme.colors.gray.gray400};
      box-shadow: none;
    }
  `,
  icon: (theme) => `
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 100px;
    background-color: ${theme.colors.gray.gray500};
    color: ${theme.colors.gray.white};
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  `,
};

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg path {
    stroke: currentColor;
  }
`;

export const Button = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 16px;
  border-radius: 8px;
  ${({ theme }) => ({ ...theme.typography.button })};
  transition: background-color 0.15s ease;

  ${({ theme, $variant }) => css(variantStyles[$variant](theme))}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
