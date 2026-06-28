import KakaoLogo from "@/assets/icons/ic_kakao.svg?react";
import useKakaoLoginBridge from "@/hooks/@common/useKakaoLoginBridge";
import CarouselLayout from "@/shared/carousel/CarouselLayout";
import OnboardingIllustration1 from "./illustrations/OnboardingIllustration1";
import OnboardingIllustration2 from "./illustrations/OnboardingIllustration2";
import * as S from "./LoginPage.styles";
import OnboardingSlide from "./slides/OnboardingSlide";

const LoginPage = () => {
  const { requestKakaoLogin } = useKakaoLoginBridge();

  return (
    <CarouselLayout
      footer={
        <S.FooterWrapper>
          <S.KakaoButton type="button" onClick={requestKakaoLogin}>
            <KakaoLogo aria-hidden="true" />
            <span>카카오로 로그인하기</span>
          </S.KakaoButton>
        </S.FooterWrapper>
      }
    >
      <OnboardingSlide
        title={"마음이 기록되는 곳,\n나만의 스페이스!"}
        description={
          "스페이스를 만들고, 소중한 사람들을 초대해보세요.\n방명록을 오래도록 모아서 볼 수 있어요."
        }
        illustration={<OnboardingIllustration1 />}
      />
      <OnboardingSlide
        title={"우리 모두의 스페이스,\n그리고 하나의 전시"}
        description={
          "다른 작가님들과 함께 전시를 열고 있나요?\n모두의 스페이스를 하나의 전시로 연결해요!"
        }
        illustration={<OnboardingIllustration2 />}
      />
    </CarouselLayout>
  );
};

export default LoginPage;
