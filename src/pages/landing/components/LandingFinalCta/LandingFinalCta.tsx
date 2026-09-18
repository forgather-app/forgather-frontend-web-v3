import { MobileBreak } from "@/pages/landing/Landing.shared.styles";
import * as S from "./LandingFinalCta.styles";

const LandingFinalCta = () => {
  return (
    <S.Wrapper>
      <S.BackgroundText aria-hidden="true">
        {"For every moment"}
        <MobileBreak />
        {" we gather!"}
      </S.BackgroundText>
      <S.Heading>
        {"당신의 전시도"}
        <MobileBreak />
        {" 오래 기억될 수 있도록"}
      </S.Heading>
      <S.CtaLink to="/">
        <S.CtaLinkText>내 전시 공간 만들기</S.CtaLinkText>
      </S.CtaLink>
    </S.Wrapper>
  );
};

export default LandingFinalCta;
