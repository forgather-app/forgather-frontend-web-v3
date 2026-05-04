import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/styled";
import type { ChipVariant } from "./DisplayChip.types";

const chipVariants: Record<ChipVariant, (theme: Theme) => string> = {
  active: (theme) => theme.colors.main.purple,
  inactive: (theme) => theme.colors.gray.gray500,
  dimmed: (theme) => theme.colors.gray.gray400,
  alert: (theme) => theme.colors.gray.gray700,
  counter: (theme) => theme.colors.gray.gray600,
};

export const Chip = styled("div", { shouldForwardProp })<{
  $variant: ChipVariant;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 20px;
  background-color: ${({ theme, $variant }) => chipVariants[$variant](theme)};
`;
