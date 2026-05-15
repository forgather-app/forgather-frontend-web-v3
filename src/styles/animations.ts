import { keyframes } from "@emotion/react";

export const gradientSweep = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
`;

export const cardFlip = keyframes`
  from { transform: rotateY(0deg); }
  to { transform: rotateY(180deg); }
`;
