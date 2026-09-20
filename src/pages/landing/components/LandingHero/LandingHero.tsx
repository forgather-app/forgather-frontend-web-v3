import heroIllustration from "@/assets/images/landing/hero_illustration.png";
import LandingAppStoreButtons from "@/pages/landing/components/LandingAppStoreButtons/LandingAppStoreButtons";
import LandingHeader from "@/pages/landing/components/LandingHeader/LandingHeader";
import { MobileBreak } from "@/pages/landing/Landing.shared.styles";
import * as S from "./LandingHero.styles";

const LandingHero = () => {
  return (
    <S.Wrapper>
      <LandingHeader />
      <S.TextGroup>
        <S.Title>
          {"작품과 마음이"}
          <MobileBreak />
          {" 함께 모이는 전시 공간"}
        </S.Title>
        <S.Subtitle>
          700+개의 소중한 방명록과 함께한 포게더에서,
          <br />
          전시의 순간을 더 오래 간직해보세요
        </S.Subtitle>
      </S.TextGroup>
      <S.AppButtonsSlot>
        <LandingAppStoreButtons />
      </S.AppButtonsSlot>
      <S.IllustrationWrapper aria-hidden="true">
        <S.IllustrationImage src={heroIllustration} alt="" />
      </S.IllustrationWrapper>
    </S.Wrapper>
  );
};

export default LandingHero;
