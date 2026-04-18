import styled from "@emotion/styled";

export const Container = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray.gray600};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.gray600};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.semantic.black};
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  width: 100%;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const Title = styled.span`
  ${({ theme }) => ({ ...theme.typography.body2 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray400};
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
