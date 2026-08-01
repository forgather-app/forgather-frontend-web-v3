import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  padding: 0 16px;
`;

export const ScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px 0 40px;
`;

export const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;

export const Message = styled.p`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;
