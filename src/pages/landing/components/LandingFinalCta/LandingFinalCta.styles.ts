import styled from "@emotion/styled";
import { LANDING_DESKTOP_QUERY } from "@/pages/landing/LandingPage.constants";

export const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 100px 16px 64px;
  min-height: 262px;
  background: linear-gradient(127deg, rgba(139, 128, 248, 1) 0%, rgba(89, 75, 250, 1) 100%);

  ${LANDING_DESKTOP_QUERY} {
    padding: 64px 16px;
    min-height: 347px;
    gap: 24px;
  }
`;

export const BackgroundText = styled.p`
  position: absolute;
  top: 4%;
  left: 0;
  right: 0;
  text-align: center;
  white-space: pre-line;
  background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(165, 181, 255, 1) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  opacity: 0.2;
  font-family: "SUIT Variable", "SUIT", sans-serif;
  font-weight: 800;
  font-size: 42px;
  line-height: 1em;
  letter-spacing: -0.02em;
  pointer-events: none;

  ${LANDING_DESKTOP_QUERY} {
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(82, 112, 253, 1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 105px;
    line-height: 1.3em;
    white-space: nowrap;
  }
`;

export const Heading = styled.h2`
  position: relative;
  ${({ theme }) => ({ ...theme.typography.title1 })};
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2em;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: pre-line;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 38px;
  }
`;
