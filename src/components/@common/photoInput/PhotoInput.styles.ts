import styled from "@emotion/styled";

export const Grid = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 12px 0 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Thumbnail = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const CoverBadge = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2px 10px;
  border-radius: 0 0 8px 8px;
  background-color: ${({ theme }) => theme.colors.semantic.black};
  color: ${({ theme }) => theme.colors.gray.white};
  text-align: center;
  ${({ theme }) => ({ ...theme.typography.caption })};
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const AddLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px;
  cursor: pointer;
`;

export const InvisibleInput = styled.input`
  display: none;
`;
