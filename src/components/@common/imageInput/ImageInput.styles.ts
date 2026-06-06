import styled from "@emotion/styled";

export const ClickArea = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

export const IconCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  border-radius: 50%;
`;

export const InvisibleInput = styled.input`
  display: none;
`;

export const PreviewImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
