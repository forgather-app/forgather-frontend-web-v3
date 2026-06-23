import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const drawLine = keyframes`
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 16px;
`;

export const TagWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive: boolean }>`
  opacity: 0;

  ${({ $isActive }) =>
    $isActive &&
    css`
      animation: ${fadeDown} 0.4s ease 0.9s forwards;
    `}
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(98, 71, 255, 0.25);
  border: 1px solid #6247ff;
  border-radius: 62px;
  white-space: nowrap;
`;

export const TagHash = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const TagText = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const LinesContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive: boolean }>`
  width: 100%;
  height: 60px;
  flex-shrink: 0;

  path {
    fill: none;
    stroke-dashoffset: 1;

    ${({ $isActive }) =>
      $isActive &&
      css`
        animation: ${drawLine} 0.6s ease 0.3s forwards;
      `}
  }
`;

export const PeopleRow = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
`;

export const PersonItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const BoxWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive: boolean }>`
  width: 60px;
  height: 60px;
  opacity: 0;

  svg {
    width: 100%;
    height: 100%;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      animation: ${slideUp} 0.5s ease 0s forwards;
    `}
`;

export const PersonRect = styled.div`
  width: 60px;
  height: 90px;
  background: ${({ theme }) => theme.colors.gray.gray500};
  border-radius: 12px;
`;
