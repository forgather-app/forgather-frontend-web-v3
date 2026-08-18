import styled from "@emotion/styled";
import IcClose from "@/assets/icons/ic_close.svg?react";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 12px 20px;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const CloseIcon = styled(IcClose)`
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const OptionRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 16px 24px;
`;

export const OptionCard = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 24px 24px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  border-radius: 8px;
`;

export const OptionTitle = styled.span`
  ${({ theme }) => ({ ...theme.typography.body2 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const OptionDescription = styled.span`
  /* TODO: 토큰 없음 - 14px/400, line-height 150% */
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;
