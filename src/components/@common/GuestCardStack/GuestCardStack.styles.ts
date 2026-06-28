import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { gradientSweep } from "@/styles/animations";

const shuffleBack = keyframes`
  0%, 100% { transform: rotate(2deg); }
  40%       { transform: rotate(3deg); }
  80%       { transform: rotate(1deg); }
`;

const shuffleMid = keyframes`
  0%, 100% { transform: rotate(-2deg); }
  40%       { transform: rotate(-1deg); }
  80%       { transform: rotate(-3deg); }
`;

export const Scene = styled.button`
  position: relative;
  width: 100%;
  max-width: 200px;
  height: 184px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  overflow: visible;
`;

export const BackCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 184px;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(17, 17, 17, 0.75);
  background: linear-gradient(90deg, #594bfa, #8b80f8, #594bfa, #8b80f8, #594bfa);
  background-size: 300% 100%;
  transform-origin: left center;
  animation:
    ${gradientSweep} 20s linear infinite,
    ${shuffleBack} 6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(1deg);
    background: linear-gradient(132.46deg, #594bfa 7.6%, #8b80f8 81.4%);
  }
`;

export const MidCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 184px;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(17, 17, 17, 0.75);
  background: linear-gradient(90deg, #594bfa, #8b80f8, #594bfa, #8b80f8, #594bfa);
  background-size: 300% 100%;
  transform-origin: left center;
  animation:
    ${gradientSweep} 20s linear infinite,
    ${shuffleMid} 6s ease-in-out 1.5s infinite backwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(-1deg);
    background: linear-gradient(132.46deg, #594bfa 7.6%, #8b80f8 81.4%);
  }
`;

export const FrontCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 184px;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(17, 17, 17, 0.75);
  border: 2px solid transparent;
  background-image: radial-gradient(
      ellipse at center,
      ${({ theme }) => theme.colors.gray.gray700},
      ${({ theme }) => theme.colors.semantic.black}
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.main.purple},
      ${({ theme }) => theme.colors.main.purple100},
      ${({ theme }) => theme.colors.main.purple},
      ${({ theme }) => theme.colors.main.purple100},
      ${({ theme }) => theme.colors.main.purple}
    );
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  background-size: 100% 100%, 300% 100%;
  animation: ${gradientSweep} 20s linear infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    border: 2px solid ${({ theme }) => theme.colors.main.purple};
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  text-align: center;
  white-space: nowrap;
`;
