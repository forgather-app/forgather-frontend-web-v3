import styled from "@emotion/styled";
import { LAYOUT } from "@/constants/constraints";

export const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: ${LAYOUT.SECTION_GAP}px;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  overflow: hidden;
`;

export const TopGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: ${LAYOUT.SIDE_PADDING}px;
`;

export const Title = styled.h2`
  flex-shrink: 0;
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: pre-line;
`;

export const Main = styled.main`
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

export const Footer = styled.footer`
  flex-shrink: 0;
`;
