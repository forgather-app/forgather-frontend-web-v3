import logoGnb from "@/assets/icons/landing/logo_gnb.svg";
import { LANDING_KAKAO_CHANNEL_URL } from "@/pages/landing/LandingPage.constants";
import * as S from "./LandingHeader.styles";

const LandingHeader = () => {
  return (
    <S.Wrapper>
      <S.Logo src={logoGnb} alt="Forgather" />
      <S.ContactButton
        type="button"
        onClick={() => {
          window.open(
            LANDING_KAKAO_CHANNEL_URL,
            "_blank",
            "noopener,noreferrer",
          );
        }}
      >
        문의하기
      </S.ContactButton>
    </S.Wrapper>
  );
};

export default LandingHeader;
