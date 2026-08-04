import styled from "@emotion/styled";

export const VisuallyHidden = styled.button`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  &:focus {
    clip: auto;
    width: auto;
    height: auto;
    padding: 8px;
    border: 2px solid blue;
  }
`;
