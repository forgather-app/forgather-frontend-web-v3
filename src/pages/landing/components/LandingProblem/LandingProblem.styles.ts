import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { LANDING_DESKTOP_QUERY } from "@/pages/landing/LandingPage.constants";

export const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: 48px 0 100px;
  background-color: ${({ theme }) => theme.colors.gray.gray700};

  ${LANDING_DESKTOP_QUERY} {
    padding: 72px 0 160px;
  }
`;

const marqueeScroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

/** 가로로 끝없이 흘러가는 카드 트랙의 공통 뷰포트 - 좌우 가장자리를 서서히 흐리게 처리한다 */
export const MarqueeViewport = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
`;

export const MarqueeTrack = styled.div<{
  $duration: number;
  $reverse?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  width: max-content;
  animation: ${marqueeScroll} ${({ $duration }) => $duration}s linear infinite;
  animation-direction: ${({ $reverse }) => ($reverse ? "reverse" : "normal")};

  @media (prefers-reduced-motion: reduce) {
    animation-play-state: paused;
  }
`;

/**
 * 인용 헤딩 위아래로 어긋나게 쌓인 정적 방명록 카드 콜라주 (Figma 배경 레이어).
 * 스크롤되지 않고, 행마다 투명도가 옅어졌다 진해졌다 하며 헤딩 뒤로 비치는 배경 텍스처 역할을 한다.
 */
export const CollageLayer = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;

  ${LANDING_DESKTOP_QUERY} {
    top: 30px;
  }
`;

export const CollageRowViewport = styled.div<{
  $opacity: number;
  $marginTop: number;
  $marginTopDesktop: number;
}>`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  opacity: ${({ $opacity }) => $opacity};
  margin-top: ${({ $marginTop }) => $marginTop}px;
  mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);

  ${LANDING_DESKTOP_QUERY} {
    margin-top: ${({ $marginTopDesktop }) => $marginTopDesktop}px;
  }
`;

export const CollageRow = styled.div<{ $shift: number; $shiftDesktop: number }>`
  display: flex;
  gap: 12px;
  transform: translateX(${({ $shift }) => $shift}px);

  ${LANDING_DESKTOP_QUERY} {
    gap: 32px;
    transform: translateX(${({ $shiftDesktop }) => $shiftDesktop}px);
  }
`;

export const TestimonialCard = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 260px;
  padding: 16px 20px 16px 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.white};

  ${LANDING_DESKTOP_QUERY} {
    width: 480px;
    gap: 32px;
    padding: 40px 30px;
    border-radius: 12px;
  }
`;

export const TestimonialIcon = styled.img`
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  border-radius: 999px;

  ${LANDING_DESKTOP_QUERY} {
    width: 61px;
    height: 61px;
  }
`;

export const TestimonialText = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody1 })};
  color: ${({ theme }) => theme.colors.semantic.black};
  white-space: pre-line;
  line-height: 1.2em;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.3em;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 240px;
  padding: 32px 16px 0;

  ${LANDING_DESKTOP_QUERY} {
    gap: 460px;
    padding: 48px 60px 0;
  }
`;

export const QuoteGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`;

export const QuoteHeadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${LANDING_DESKTOP_QUERY} {
    gap: 16px;
  }
`;

export const QuoteIcon = styled.img`
  flex: 0 0 auto;
  width: 18px;
  height: 18px;

  ${LANDING_DESKTOP_QUERY} {
    width: 28px;
    height: 28px;
  }
`;

export const QuoteHeading = styled.h2`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  font-size: 24px;
  font-weight: 800;
  line-height: 1.35em;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: pre-line;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 38px;
  }
`;

export const QuoteDescription = styled.p`
  ${({ theme }) => ({ ...theme.typography.body2 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  max-width: 520px;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 24px;
    font-weight: 600;
    max-width: 640px;
  }
`;

export const DashTick = styled.img<{ $variant: "mobile" | "desktop" }>`
  position: relative;
  z-index: 1;
  display: ${({ $variant }) => ($variant === "mobile" ? "block" : "none")};
  width: 11px;
  height: 67px;

  ${LANDING_DESKTOP_QUERY} {
    display: ${({ $variant }) => ($variant === "desktop" ? "block" : "none")};
    height: 168px;
  }
`;

export const SummaryGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
`;

export const ArcGraphic = styled.img<{ $variant: "mobile" | "desktop" }>`
  display: ${({ $variant }) => ($variant === "mobile" ? "block" : "none")};
  position: absolute;
  top: 42px;
  left: 50%;
  transform: translateX(-50%);
  width: 567px;
  max-width: none;
  pointer-events: none;
  z-index: 0;

  ${LANDING_DESKTOP_QUERY} {
    display: ${({ $variant }) => ($variant === "desktop" ? "block" : "none")};
    top: 109px;
    width: 2115px;
  }
`;

export const SummaryHeading = styled.h3`
  position: relative;
  z-index: 1;
  ${({ theme }) => ({ ...theme.typography.title1 })};
  font-size: 22px;
  font-weight: 800;
  line-height: 1.35em;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray.white};
  white-space: pre-line;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 38px;
  }
`;

export const StatRow = styled(MarqueeTrack)`
  gap: 12px;

  ${LANDING_DESKTOP_QUERY} {
    gap: 16px;
  }
`;

export const StatCard = styled.div`
  flex: 0 0 auto;
  width: 216px;
  min-height: 220px;
  padding: 16px 12px;
  border: 2px solid #cfd6dd; /* TODO: 토큰 없음 - #CFD6DD */
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray.white};
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${LANDING_DESKTOP_QUERY} {
    width: 398px;
    min-height: 217px;
    padding: 40px 30px;
    gap: 12px;
  }
`;

export const StatValue = styled.p`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.main.purple};

  ${LANDING_DESKTOP_QUERY} {
    font-size: 42px;
  }
`;

export const StatDescription = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.semantic.black};
  white-space: pre-line;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 24px;
    font-weight: 700;
  }
`;
