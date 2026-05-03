import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";

const cardBase = `
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const Card = styled.button`
  ${cardBase}
  background: linear-gradient(185.96deg, #292d32 6.05%, ${({ theme }) =>
    theme.colors.gray.gray600} 57%);
`;

export const NewCard = styled.button`
  ${cardBase}
  position: relative;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.gray.gray700} 12.5%,
    ${({ theme }) => theme.colors.semantic.black}
  );

  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 10px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.main.purple},
      ${({ theme }) => theme.colors.main.purple100},
      ${({ theme }) => theme.colors.main.purple},
      ${({ theme }) => theme.colors.main.purple100},
      ${({ theme }) => theme.colors.main.purple}
    );
    background-size: 300% 100%;
    animation: ${gradientSweep} 20s linear infinite;
    z-index: -1;
  }
`;

export const NewCardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NewCardText = styled.span`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  white-space: nowrap;
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
  text-align: left;
`;

export const TitleBold = styled.span`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  display: block;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TitleRegular = styled.span`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray200};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const PhotoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.gray.gray500};
  border-radius: 100px;
  overflow: hidden;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const ChevronWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transform: scaleX(-1);
`;
