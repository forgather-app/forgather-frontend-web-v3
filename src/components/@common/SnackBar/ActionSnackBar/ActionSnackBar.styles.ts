import styled from "@emotion/styled";
import { slideIn, slideOut } from "@/styles/animations";
import { shouldForwardProp } from "@/utils/styled";

export const Wrapper = styled("div", { shouldForwardProp })<{
  $isVisible: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 328px;
  height: 48px;
  padding: 12px 16px 12px 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray.white};
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.08);

  animation: ${({ $isVisible }) => ($isVisible ? slideIn : slideOut)} 0.3s ease forwards;
`;

export const Message = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray700};
  overflow: hidden;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 80%;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray400};
  white-space: nowrap;
`;
