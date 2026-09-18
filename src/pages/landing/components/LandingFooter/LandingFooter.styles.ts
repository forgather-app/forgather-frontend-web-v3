import styled from "@emotion/styled";
import { LANDING_DESKTOP_QUERY } from "@/pages/landing/LandingPage.constants";

export const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 16px;
  background-color: #f3f4f6; /* TODO: 토큰 없음 - #F3F4F6 */

  ${LANDING_DESKTOP_QUERY} {
    gap: 12px;
    padding: 36px 60px;
  }
`;

export const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  ${LANDING_DESKTOP_QUERY} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${LANDING_DESKTOP_QUERY} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Logo = styled.img`
  width: 104px;
  height: 26px;

  ${LANDING_DESKTOP_QUERY} {
    width: 126px;
    height: 32px;
  }
`;

export const LinkGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  ${LANDING_DESKTOP_QUERY} {
    gap: 28px;
  }
`;

export const LinkButton = styled.button`
  ${({ theme }) => ({ ...theme.typography.subBody2 })};
  color: ${({ theme }) => theme.colors.gray.gray400};

  ${LANDING_DESKTOP_QUERY} {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const Copyright = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody2 })};
  color: ${({ theme }) => theme.colors.gray.gray400};

  ${LANDING_DESKTOP_QUERY} {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const SocialGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12.5px;

  ${LANDING_DESKTOP_QUERY} {
    gap: 20px;
  }
`;

export const SocialLink = styled.a`
  display: inline-flex;
`;

export const SocialIcon = styled.img`
  width: 20px;
  height: 20px;

  ${LANDING_DESKTOP_QUERY} {
    width: 32px;
    height: 32px;
  }
`;
