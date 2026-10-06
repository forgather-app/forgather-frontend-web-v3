import type { ReactNode } from "react";
import icForgatherMark from "@/assets/icons/landing/ic_forgather_mark.svg";
import featureArtwork from "@/assets/images/landing/feature_artwork.png";
import featureGuestbook from "@/assets/images/landing/feature_guestbook.png";
import featureShare from "@/assets/images/landing/feature_share.png";
import featureSpace from "@/assets/images/landing/feature_space.png";
import { MobileBreak } from "@/pages/landing/Landing.shared.styles";
import {
  LANDING_FEATURES,
  type LandingFeatureId,
} from "@/pages/landing/LandingPage.constants";
import * as S from "./LandingFeatureList.styles";

const FEATURE_IMAGES: Record<LandingFeatureId, string> = {
  space: featureSpace,
  share: featureShare,
  guestbook: featureGuestbook,
  artwork: featureArtwork,
};

/** 배경에 번갈아 배치되는 포게더 브랜드 마크 워터마크 */
const BACKGROUND_MARKS: {
  id: string;
  side: "left" | "right";
  top: number;
  size: number;
}[] = [
  { id: "mark-1", side: "right", top: 2, size: 380 },
  { id: "mark-2", side: "left", top: 26, size: 320 },
  { id: "mark-3", side: "right", top: 50, size: 300 },
  { id: "mark-4", side: "left", top: 74, size: 220 },
  { id: "mark-5", side: "right", top: 92, size: 320 },
];

/** "^" 문자를 기준으로 모바일 전용 줄바꿈을 삽입한다. 실제 "\n"은 CSS(white-space: pre-line)가 처리한다. */
const renderHeading = (heading: string): ReactNode[] => {
  const segments = heading.split("^");
  return segments.flatMap((segment, index) =>
    index < segments.length - 1
      ? [segment, <MobileBreak key={`${segment}-break`} />]
      : [segment],
  );
};

const LandingFeatureList = () => {
  return (
    <S.Wrapper>
      {BACKGROUND_MARKS.map((mark) => (
        <S.BackgroundMark
          key={mark.id}
          src={icForgatherMark}
          alt=""
          aria-hidden="true"
          $side={mark.side}
          $top={mark.top}
          $size={mark.size}
        />
      ))}
      <S.List>
        {LANDING_FEATURES.map((feature) => (
          <S.Item key={feature.id}>
            <S.Eyebrow>{feature.eyebrow}</S.Eyebrow>
            <S.Heading>{renderHeading(feature.heading)}</S.Heading>
            <S.GraphicWrapper aria-hidden="true">
              <S.GraphicImage src={FEATURE_IMAGES[feature.id]} alt="" />
            </S.GraphicWrapper>
            <S.Description>{feature.description}</S.Description>
          </S.Item>
        ))}
      </S.List>
    </S.Wrapper>
  );
};

export default LandingFeatureList;
