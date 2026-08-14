import styled from "@emotion/styled";
import IcClose from "@/assets/icons/ic_close.svg?react";

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 16px 12px 20px;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: pre-line;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const CloseIcon = styled(IcClose)`
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 16px 24px;
`;

export const EmptyText = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  padding: 24px 0;
  text-align: center;
`;
