import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";

type Variant = "pill" | "box";
type ActiveState = "active" | "inactive";

const containerVariants: Record<Variant, (theme: Theme) => string> = {
  pill: (theme) => `
    background-color: ${theme.colors.gray.gray600};
    border-radius: 999px;
    box-shadow: 0px 0px 20px 0px rgba(17, 17, 17, 0.75);
  `,
  box: (theme) => `
    width: 100%;
    background-color: ${theme.colors.gray.gray600};
    border-radius: 10px;
  `,
};

const indicatorVariants: Record<Variant, (theme: Theme) => string> = {
  pill: (theme) => `
    background-color: ${theme.colors.gray.gray500};
    border-radius: 999px;
  `,
  box: (theme) => `
    background-color: ${theme.colors.gray.gray500};
    border-radius: 8px;
  `,
};

const tabButtonVariants: Record<
  Variant,
  Record<ActiveState, (theme: Theme) => string>
> = {
  pill: {
    active: (theme) => `
      padding: 8px 16px;
      color: ${theme.colors.gray.white};
    `,
    inactive: (theme) => `
      padding: 8px 16px;
      color: ${theme.colors.gray.gray300};
    `,
  },
  box: {
    active: (theme) => `
      padding: 8px 10px;
      color: ${theme.colors.gray.white};
    `,
    inactive: (theme) => `
      padding: 8px 10px;
      color: ${theme.colors.gray.gray300};
    `,
  },
};

export const Container = styled.div<{ variant: Variant }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 4px;
  ${({ variant, theme }) => containerVariants[variant](theme)}
`;

export const Indicator = styled.div<{
  variant: Variant;
  isRightActive: boolean;
}>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ isRightActive }) =>
    isRightActive ? "translateX(100%)" : "translateX(0)"};
  ${({ variant, theme }) => indicatorVariants[variant](theme)}
`;

export const TabButton = styled.button<{ variant: Variant; isActive: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  ${({ theme }) => ({ ...theme.typography.body1 })};
  transition: color 0.3s ease;
  z-index: 1;
  ${({ variant, theme, isActive }) =>
    tabButtonVariants[variant][isActive ? "active" : "inactive"](theme)}
`;
