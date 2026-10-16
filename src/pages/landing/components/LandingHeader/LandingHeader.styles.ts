import styled from "@emotion/styled";
import { LANDING_DESKTOP_QUERY } from "@/pages/landing/LandingPage.constants";

export const Wrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;

  ${LANDING_DESKTOP_QUERY} {
    padding: 20px 60px;
  }
`;

export const Logo = styled.img`
  width: 78px;
  height: 20px;

  ${LANDING_DESKTOP_QUERY} {
    width: 126px;
    height: 32px;
  }
`;

export const ContactButton = styled.button`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.gray100};

  ${LANDING_DESKTOP_QUERY} {
    font-size: 20px;
    font-weight: 700;
  }
`;
