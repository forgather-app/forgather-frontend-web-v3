import styled from "@emotion/styled";
import { selectableText } from "@/styles/mixins";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const InfoRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;

  &:empty {
    display: none;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const InfoLabel = styled.span`
  flex-shrink: 0;
  width: 52px;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const PeriodValue = styled.span`
  flex: 1;
  min-width: 0;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.gray50};
  word-break: keep-all;
  ${selectableText};
`;

export const SpaceLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  color: ${({ theme }) => theme.colors.gray.gray50};

  svg {
    flex-shrink: 0;
  }
`;

export const SpaceLinkText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: underline;
  text-underline-position: from-font;
  ${selectableText};
`;

export const DescriptionRow = styled("div", { shouldForwardProp })<{
  $isExpanded: boolean;
}>`
  display: flex;
  flex-direction: ${({ $isExpanded }) => ($isExpanded ? "column" : "row")};
  align-items: flex-end;
  gap: 4px;
  margin-top: 20px;
`;

export const Description = styled("p", { shouldForwardProp })<{
  $isExpanded: boolean;
}>`
  flex: 1;
  width: 100%;
  min-width: 0;
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $isExpanded }) => ($isExpanded ? "unset" : 3)};
  -webkit-box-orient: vertical;
  ${selectableText};
`;

export const MoreButton = styled.button`
  flex-shrink: 0;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  font-weight: 400; /* TODO: 토큰 없음 - 14px regular */
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;
