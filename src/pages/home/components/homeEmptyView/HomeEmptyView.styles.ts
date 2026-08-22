import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex: 1;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.heading1 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  text-align: center;
`;

export const SubText = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  text-align: center;
  white-space: pre-line;
`;
