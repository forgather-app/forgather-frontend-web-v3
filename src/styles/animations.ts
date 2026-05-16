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
export const cardFlip = keyframes`
  from { transform: rotateY(0deg); }
  to { transform: rotateY(180deg); }
`;
