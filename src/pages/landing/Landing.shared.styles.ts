import styled from "@emotion/styled";
import { LANDING_DESKTOP_QUERY } from "./LandingPage.constants";

/** 모바일 디자인에만 존재하는 줄바꿈. PC에서는 한 줄로 흐르도록 숨긴다. */
export const MobileBreak = styled.br`
  display: block;

  ${LANDING_DESKTOP_QUERY} {
    display: none;
  }
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.main.purple};
`;

export const SectionContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;

  ${LANDING_DESKTOP_QUERY} {
    padding: 0 60px;
  }
`;
