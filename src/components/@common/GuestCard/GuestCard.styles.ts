import styled from "@emotion/styled";

export const Scene = styled.div`
  width: 100%;
  max-width: 200px;
  height: 184px;
`;

export const Front = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    154.57deg,
    #292d32 4.34%,
    ${({ theme }) => theme.colors.gray.gray600} 57.97%
  );
  border: 1px solid rgba(65, 72, 85, 0.8);
  padding-top: 10px;
  padding-bottom: 14px;
`;

export const CardHeader = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 0 10px;
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;
`;

export const IconButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  &::before {
    content: "";
    position: absolute;
    inset: -8px;
  }
  &:active {
    transform: scale(0.85);
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
`;

export const Author = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Text = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray200};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  max-height: 88px;
`;
