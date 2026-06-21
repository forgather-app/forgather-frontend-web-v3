import styled from "@emotion/styled";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 64px;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  white-space: pre-line;
`;

export const Description = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray200};
  white-space: pre-line;
`;

export const IllustrationArea = styled.div`
  flex: 1;
  margin-top: 32px;
  position: relative;
  overflow: hidden;
`;
