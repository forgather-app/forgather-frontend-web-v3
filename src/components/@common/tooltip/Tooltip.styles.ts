import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { float } from "@/styles/animations";

const fadeIn = keyframes`
  from { opacity: 0;}
  to   { opacity: 1; }
`;

const baseContainer = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const DarkContainer = styled.div`
  ${baseContainer}
  padding: 4px 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.semantic.black};
  white-space: nowrap;
  animation: ${fadeIn} 0.2s ease-out both;

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    /* arrow center: calc(50% - 38px), minus half-width 7px */
    left: calc(50% - 45px);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }
`;

export const GradientContainer = styled.div`
  ${baseContainer}
  width: fit-content;
  padding: 10px 12px;
  border-radius: 8px;
  background: ${({ theme }) =>
    `linear-gradient(150deg, ${theme.colors.gray.gray500}, ${theme.colors.gray.gray600})`};
  white-space: normal;
  max-width: min(260px, calc(100vw - 32px));
`;

export const GradientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  filter: drop-shadow(0px 6px 8px rgba(17, 17, 17, 0.7));
  animation:
    ${fadeIn} 0.2s ease-out both,
    ${float} 2.4s ease-in-out 0.2s infinite;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;
