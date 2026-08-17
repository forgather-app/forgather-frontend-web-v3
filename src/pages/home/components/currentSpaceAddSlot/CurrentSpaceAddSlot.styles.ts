import styled from "@emotion/styled";
import IcPlus from "@/assets/icons/ic_plus.svg?react";

export const Slot = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 262px;
  border: 1.5px dashed ${({ theme }) => theme.colors.gray.gray400};
  border-radius: 8px;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  /* TODO: 토큰 없음 - 14.4px */
  border-radius: 14.4px;
`;

export const PlusIcon = styled(IcPlus)`
  path {
    stroke: ${({ theme }) => theme.colors.gray.gray200};
  }
`;

export const Text = styled.span`
  ${({ theme }) => ({ ...theme.typography.button })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;
