import styled from "@emotion/styled";
import IcChevronRight from "@/assets/icons/ic_chevron_right.svg?react";

export const Banner = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  text-align: left;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  ${({ theme }) => ({ ...theme.typography.body2 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const Description = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  font-size: 14px; /* TODO: 토큰 없음 - weight 400/14px 조합 토큰 부재 */
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const ChevronIcon = styled(IcChevronRight)`
  path {
    stroke: ${({ theme }) => theme.colors.icon.weak};
  }
`;
