import styled from "@emotion/styled";

export const Frame = styled.button`
  display: block;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
`;

export const Thumbnail = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const PlaceholderBox = styled.div`
  width: 100%;
  height: 140px;
  border: 1px dashed ${({ theme }) => theme.colors.gray.gray500};
  background-color: ${({ theme }) => theme.colors.gray.gray600};
`;
