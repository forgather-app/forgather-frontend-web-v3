import icInstagram from "@/assets/icons/landing/ic_instagram.svg";
import icKakao from "@/assets/icons/landing/ic_kakao.svg";
import icMail from "@/assets/icons/landing/ic_mail.svg";
import logoFooter from "@/assets/icons/landing/logo_footer.svg";
import { LANDING_KAKAO_CHANNEL_URL } from "@/pages/landing/LandingPage.constants";
import * as S from "./LandingFooter.styles";

const LandingFooter = () => {
  return (
    <S.Wrapper>
      <S.TopRow>
        <S.Logo src={logoFooter} alt="Forgather" />
        <S.SocialGroup>
          <S.SocialLink
            href="https://www.instagram.com/forgather_official/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="인스타그램"
          >
            <S.SocialIcon src={icInstagram} alt="" />
          </S.SocialLink>
          <S.SocialLink
            href={LANDING_KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오톡 채널"
          >
            <S.SocialIcon src={icKakao} alt="" />
          </S.SocialLink>
          <S.SocialLink
            href="mailto:forgather48@gmail.com"
            aria-label="이메일 문의"
          >
            <S.SocialIcon src={icMail} alt="" />
          </S.SocialLink>
        </S.SocialGroup>
      </S.TopRow>
      <S.BottomRow>
        <S.LinkGroup>
          {/* TODO: 공개(비로그인) 약관 페이지 경로 미정의 - 기획 확정 후 연결 */}
          <S.LinkButton type="button">개인정보처리방침</S.LinkButton>
          <S.LinkButton type="button">이용약관</S.LinkButton>
        </S.LinkGroup>
        <S.Copyright>© 2026 Forgather All rights reserved.</S.Copyright>
      </S.BottomRow>
    </S.Wrapper>
  );
};

export default LandingFooter;
