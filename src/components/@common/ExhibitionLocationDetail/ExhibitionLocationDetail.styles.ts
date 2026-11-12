import styled from "@emotion/styled";
import { selectableText } from "@/styles/mixins";

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const Label = styled.span`
  flex-shrink: 0;
  width: 52px;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PlaceName = styled.span`
  max-width: 100%;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.gray50};
  white-space: normal;
  overflow-wrap: anywhere;
  ${selectableText};
`;

export const MapLink = styled.a`
  display: inline-flex;
  align-items: flex-start;
  max-width: 100%;
  gap: 4px;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }

  span {
    text-decoration: underline;
    text-underline-position: from-font;
  }
`;
