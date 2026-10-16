import styled from "@emotion/styled";
import { selectableText } from "@/styles/mixins";

export const Card = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 4px 16px 4px 4px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.gray500};
  }
`;

export const Thumbnail = styled.img`
  width: 72px;
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
  flex: 1;
  min-width: 0;
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  padding-left: 2px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  ${selectableText};
`;
