import styled from "@emotion/styled";
import { shouldForwardProp } from "@/utils/shouldForwardProp";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
`;

export const AllAgreeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px;
  padding: 16px;
`;

export const AllAgreeLabel = styled.label`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.white};
  cursor: pointer;
`;

export const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ItemRow = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 8px 16px 8px 8px;
`;

export const ItemLabel = styled("button", { shouldForwardProp })<{
  $hasModal: boolean;
}>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: ${({ $hasModal }) => ($hasModal ? "pointer" : "default")};
  color: ${({ theme }) => theme.colors.gray.gray100};
  min-width: 0;
`;

export const RequiredBadge = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.main.purple50};
  flex-shrink: 0;
`;

export const OptionalBadge = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray400};
  flex-shrink: 0;
`;

export const LabelText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChevronIcon = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;

export const CheckboxWrapper = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  flex-shrink: 0;

  &:has(input:focus-visible) > span {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 100%;
`;

// 체크 전에는 회색(gray500), 체크 후에는 보라색 배경. 체크마크 아이콘은 항상 표시됩니다.
export const CheckIcon = styled("span", { shouldForwardProp })<{
  $checked: boolean;
}>`
  position: absolute;
  inset: 16.67%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.main.purple : theme.colors.gray.gray500};
  transition: background-color 0.15s;

  svg {
    color: ${({ theme }) => theme.colors.gray.gray200};
  }
`;

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 24px 16px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h3`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const ModalCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray.gray300};
  flex-shrink: 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    border-radius: 4px;
  }
`;

export const ModalBody = styled.div`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  overflow-y: auto;
  max-height: 324px;
  padding-right: 20px;
  padding-bottom: 20px;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.gray.gray400} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray.gray400};
    border-radius: 999px;
  }
`;
