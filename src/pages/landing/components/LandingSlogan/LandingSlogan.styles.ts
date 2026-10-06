import styled from "@emotion/styled";
import { LANDING_DESKTOP_QUERY } from "@/pages/landing/LandingPage.constants";

export const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 56px 16px;
  background: linear-gradient(180deg, rgba(210, 202, 255, 1) 0%, rgba(163, 147, 255, 1) 100%);

  ${LANDING_DESKTOP_QUERY} {
    flex-direction: row;
    justify-content: center;
    gap: 96px;
    padding: 0 60px;
    min-height: 481px;
  }
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;

  ${LANDING_DESKTOP_QUERY} {
    align-items: flex-start;
    text-align: left;
  }
`;

export const Eyebrow = styled.p`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  font-size: 16px;
  font-weight: 800;
  color: #4f59ff; /* TODO: 토큰 없음 - #4F59FF */
  opacity: 0.8;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 24px;
  }
`;

export const Heading = styled.p`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  font-size: 32px;
  font-weight: 800;
  line-height: 1.2em;
  white-space: pre-line;
  background: linear-gradient(180deg, rgba(126, 120, 245, 1) 0%, rgba(82, 112, 253, 1) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 38px;
  }
`;

export const IllustrationImage = styled.img`
  width: 100%;
  max-width: 358px;
  height: auto;

  ${LANDING_DESKTOP_QUERY} {
    width: 358px;
  }
`;
