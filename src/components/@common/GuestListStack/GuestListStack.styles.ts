import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const floatCard = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-2px); }
`;

export const Container = styled.button`
  position: relative;
  height: 64px;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
  overflow: visible;
`;

export const BackCard = styled.div`
  position: absolute;
  top: 0;
  left: 13px;
  right: 13px;
  height: 58px;
  border-radius: 8px;
  background: #594bfa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: ${floatCard} 3s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MidCard = styled.div`
  position: absolute;
  top: 3px;
  left: 6px;
  right: 6px;
  height: 58px;
  border-radius: 8px;
  background: linear-gradient(170.47deg, #7265fd 7.6%, #8b80f8 81.4%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: ${floatCard} 3s ease-in-out 1s infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const FrontCard = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  right: 0;
  height: 58px;
  border-radius: 8px;
  border: 0.75px solid #665be1;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.gray.gray700} 12.5%,
    ${({ theme }) => theme.colors.semantic.black}
  );
  display: flex;
  align-items: center;
  padding: 16px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  white-space: nowrap;
`;
