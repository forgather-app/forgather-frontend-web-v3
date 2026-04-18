import styled from "@emotion/styled";

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: ${({ theme }) => theme.layout.zIndex.backdrop};
`;
