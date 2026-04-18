import styled from "@emotion/styled";

export const Track = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.gray.gray400};
  border-radius: 10px;
  overflow: hidden;
`;

export const Fill = styled.div<{ value: number }>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main.purple};
  border-radius: 10px;
  transform-origin: left center;
  transform: ${({ value }) => `scaleX(${value / 100})`};
  transition: transform 0.3s ease;
`;
