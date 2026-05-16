import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "underlined";

const getVariantStyle = (theme: Theme, variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return css`
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
      `;
    case "secondary":
      return css`
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
      `;
    case "tertiary":
      return css`
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
      `;
    case "underlined":
      return css`
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
      `;
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
  transition: background-color 0.15s ease;

  ${({ theme, $variant }) => getVariantStyle(theme, $variant)}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
