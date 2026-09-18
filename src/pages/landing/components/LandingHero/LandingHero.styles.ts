import styled from "@emotion/styled";
import { LANDING_DESKTOP_QUERY } from "@/pages/landing/LandingPage.constants";

export const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 72px 16px 0;
  background: radial-gradient(circle at 32% 0%, rgba(109, 118, 132, 0.3) 0%, rgba(109, 118, 132, 0) 100%),
    ${({ theme }) => theme.colors.semantic.black};

  ${LANDING_DESKTOP_QUERY} {
    padding: 160px 60px 0;
  }
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;

  ${LANDING_DESKTOP_QUERY} {
    gap: 16px;
  }
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2em;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: pre-line;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 42px;
    line-height: 1.35em;
  }
`;

export const Subtitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35em;
  color: ${({ theme }) => theme.colors.gray.gray100};
  opacity: 0.5;
  white-space: pre-line;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 24px;
  }
`;

/** 곧 앱으로 만나요 - PC/모바일 동일 문구의 안내 배지 (스토어 출시 전이라 다운로드 링크 없음) */
export const AppBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 14px 32px;
  border-radius: 999px;
  border: 1px solid transparent;
  background:
    radial-gradient(circle at 50% 100%, rgba(30, 32, 34, 1) 0%, rgba(17, 17, 17, 1) 100%) padding-box,
    linear-gradient(127deg, rgba(139, 128, 248, 1) 0%, rgba(89, 75, 250, 1) 100%) border-box;
  ${({ theme }) => ({ ...theme.typography.body1 })};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray.gray100};

  ${LANDING_DESKTOP_QUERY} {
    margin-top: 24px;
    padding: 16px 37px;
    font-size: 20px;
  }
`;

export const IllustrationWrapper = styled.div`
  width: 100%;
  max-width: 264px;
  margin-top: 12px;

  ${LANDING_DESKTOP_QUERY} {
    max-width: 407px;
    margin-top: 24px;
  }
`;

export const IllustrationImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;
