import styled from "@emotion/styled";

export const Track = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.gray.gray400};
  border-radius: 10px;
  overflow: hidden;
`;

export const Fill = styled.div<{ value: number }>`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main.purple};
  border-radius: 10px;
  transition: width 0.3s ease;
`;
