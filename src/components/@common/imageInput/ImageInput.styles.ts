import styled from "@emotion/styled";

export const ClickArea = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px;
  cursor: pointer;
`;

export const IconCircle = styled.div`
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
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  object-fit: cover;
`;
