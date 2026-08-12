import { keyframes } from "@emotion/react";

export const gradientSweep = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
`;

export const slideIn = keyframes`
  from {transform: translateY(100%)}
  to{transform: translateY(0%)}
`;

export const slideOut = keyframes`
  from { transform: translateY(0%); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
`;

export const dissolve = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const cardFlip = keyframes`
  from { transform: rotateY(0deg); }
  to { transform: rotateY(180deg); }
`;

export const popIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;
