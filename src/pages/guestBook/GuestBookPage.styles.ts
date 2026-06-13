import styled from "@emotion/styled";

export const FilterSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray600};
`;

export const CountText = styled.p`
  ${({ theme }) => ({ ...theme.typography.heading3 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const CountNumber = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const ChipRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  row-gap: 16px;
`;

export const GuestListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContentWrapper = styled.div`
  position: relative;
`;

export const TooltipAnchor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const TooltipCount = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const TooltipSub = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const TooltipText = styled.div`
  display: flex;
`;

export const BottomSpacer = styled.div`
  position: sticky;
  bottom: 0;
  flex-shrink: 0;
  height: 34px;
  background: linear-gradient(
    180deg,
    rgba(27, 29, 31, 0) 0%,
    ${({ theme }) => theme.colors.gray.gray700} 50%
  );
  pointer-events: none;
`;

export const BottomTabWrapper = styled.div`
  position: fixed;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.layout.zIndex.bottomSheet};
`;
