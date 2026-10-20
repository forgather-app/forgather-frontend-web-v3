import styled from "@emotion/styled";
import { selectableText } from "@/styles/mixins";

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 12px;
`;

export const Label = styled.span`
  flex-shrink: 0;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const PlaceName = styled.span`
  max-width: 100%;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: normal;
  overflow-wrap: anywhere;
  ${selectableText};
`;

export const MapLink = styled.a`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.main.purple100};
  text-decoration: underline;
  text-underline-position: from-font;
`;
