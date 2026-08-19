import styled from "@emotion/styled";

export const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 200px;
  height: 200px;
  padding-bottom: 8px;
  border-radius: 1000px;
  background-color: rgba(27, 29, 31, 0.75);
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const Text = styled.p`
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;
