import styled from "@emotion/styled";

export const Wrapper = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const Slot = styled.div<{ $align: "start" | "end" }>`
  display: flex;
  align-items: center;
  justify-self: ${({ $align }) => $align};
`;

export const IconButton = styled.button<{ $align: "start" | "end" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.gray.gray100};
  ${({ $align }) => $align === "start" && "margin-left: -12px;"}
  ${({ $align }) => $align === "end" && "margin-right: -12px;"}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const TextButton = styled.button`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  padding: 8px 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const Title = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading3 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
