import styled from "@emotion/styled";

export const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  width: 100%;
  height: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  padding: 0 ${({ theme }) => theme.layout.sidePadding}px
    ${({ theme }) => theme.layout.sidePadding}px;
`;
