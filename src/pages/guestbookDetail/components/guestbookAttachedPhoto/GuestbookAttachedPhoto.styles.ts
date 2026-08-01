import styled from "@emotion/styled";

export const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 140px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceholderBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px dashed ${({ theme }) => theme.colors.gray.gray500};
  background-color: ${({ theme }) => theme.colors.gray.gray600};
`;

export const CountBadge = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 4px 8px;
  border-radius: 999px;
  /* semantic.black(#111111) 75% opacity */
  background-color: rgba(17, 17, 17, 0.75);
  color: ${({ theme }) => theme.colors.gray.white};
  ${({ theme }) => ({ ...theme.typography.caption })};
`;
