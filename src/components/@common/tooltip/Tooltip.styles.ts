import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.semantic.black};
  border-radius: 4px;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    /* arrow center: calc(50% - 38px), minus half-width 7px */
    left: calc(50% - 45px);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.colors.semantic.black};
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;
