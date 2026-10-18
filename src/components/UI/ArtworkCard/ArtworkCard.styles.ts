import styled from "@emotion/styled";
import { selectableText } from "@/styles/mixins";

export const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  width: 100%;
  padding: 4px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.gray500};
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 72px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  flex-shrink: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 8px 8px;
  min-width: 0;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${selectableText};
`;

export const AuthorName = styled.p`
  /* TODO: 토큰 없음 - fontWeight 400, fontSize 14px, lineHeight 150%, letterSpacing -0.02em (Body 14/R) */
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray300};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${selectableText};
`;
