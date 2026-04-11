import styled from "@emotion/styled";
import type { StatusType } from "../../../types/status";

export const Chip = styled.div<{ status: StatusType }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 20px;
  background-color: ${({ theme, status }) =>
    status === "inProgress"
      ? theme.colors.main.purple
      : theme.colors.gray.gray500};
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody2 })};
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: nowrap;
`;
