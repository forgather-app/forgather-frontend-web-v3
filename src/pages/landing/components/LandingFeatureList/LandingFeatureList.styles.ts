import styled from "@emotion/styled";
import { LANDING_DESKTOP_QUERY } from "@/pages/landing/LandingPage.constants";

export const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray.white};
  padding: 60px 16px;

  ${LANDING_DESKTOP_QUERY} {
    padding: 100px 60px;
  }
`;

/** 배경에 흩뿌려진 포게더 브랜드 마크 워터마크 */
export const BackgroundMark = styled.img<{
  $side: "left" | "right";
  $top: number;
  $size: number;
}>`
  position: absolute;
  z-index: 0;
  top: ${({ $top }) => $top}%;
  ${({ $side, $size }) => ($side === "left" ? `left: -${$size * 0.3}px;` : `right: -${$size * 0.3}px;`)}
  width: ${({ $size }) => $size * 0.6}px;
  height: ${({ $size }) => $size * 0.6}px;
  pointer-events: none;

  ${LANDING_DESKTOP_QUERY} {
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    ${({ $side, $size }) => ($side === "left" ? `left: -${$size * 0.35}px;` : `right: -${$size * 0.35}px;`)}
  }
`;

export const List = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  max-width: 960px;
  margin: 0 auto;

  ${LANDING_DESKTOP_QUERY} {
    gap: 80px;
  }
`;

export const Item = styled.article`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
`;

export const Eyebrow = styled.p`
  ${({ theme }) => ({ ...theme.typography.body2 })};
  font-weight: 700;
  background: linear-gradient(127deg, rgba(139, 128, 248, 1) 0%, rgba(89, 75, 250, 1) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 24px;
  }
`;

export const Heading = styled.h3`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  font-size: 18px;
  font-weight: 800;
  line-height: 1.35em;
  color: ${({ theme }) => theme.colors.semantic.black};
  white-space: pre-line;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 38px;
  }
`;

export const GraphicWrapper = styled.div`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;

  ${LANDING_DESKTOP_QUERY} {
    border-radius: 16px;
  }
`;

export const GraphicImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const Description = styled.p`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray500};
  white-space: pre-line;

  ${LANDING_DESKTOP_QUERY} {
    font-size: 20px;
    font-weight: 500;
  }
`;
