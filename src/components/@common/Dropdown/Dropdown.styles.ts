import styled from "@emotion/styled";
import { popIn } from "@/styles/animations";

export const Panel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: ${({ theme }) => theme.layout.zIndex.modalContent};
  width: 136px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  box-shadow: 0px 0px 20px 0px rgba(17, 17, 17, 0.75);
  transform-origin: top right;
  animation: ${popIn} 150ms ease-out;
`;

export const Item = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 44px;
  padding: 0 16px;
  text-align: left;
  ${({ theme }) => ({ ...theme.typography.body3 })};
  color: ${({ theme }) => theme.colors.gray.gray100};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray500};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.gray.gray400};
    cursor: not-allowed;
  }
`;
