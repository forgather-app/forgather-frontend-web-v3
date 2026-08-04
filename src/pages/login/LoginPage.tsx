import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import AppleLogo from "@/assets/icons/ic_apple.svg?react";
import KakaoLogo from "@/assets/icons/ic_kakao.svg?react";
import Button from "@/components/@common/Button/Button";
import useAppleLoginBridge from "@/hooks/@common/useAppleLoginBridge";
import useKakaoLoginBridge from "@/hooks/@common/useKakaoLoginBridge";
import CarouselLayout from "@/shared/carousel/CarouselLayout";
import DevLoginModal from "./components/DevLoginModal/DevLoginModal";
import OnboardingIllustration1 from "./illustrations/OnboardingIllustration1";
import OnboardingIllustration2 from "./illustrations/OnboardingIllustration2";
import * as S from "./LoginPage.styles";
import OnboardingSlide from "./slides/OnboardingSlide";

const routeApi = getRouteApi("/login/");

const LoginPage = () => {
  const { redirectTo } = routeApi.useSearch();
  const { requestAppleLogin, isRequesting: isAppleRequesting } =
    useAppleLoginBridge(redirectTo);
  const { requestKakaoLogin, isRequesting: isKakaoRequesting } =
    useKakaoLoginBridge(redirectTo);
  const [isDevLoginOpen, setIsDevLoginOpen] = useState(false);

  return (
    <CarouselLayout
      footer={
        <S.FooterWrapper>
          <S.AppleButton
            type="button"
            onClick={requestAppleLogin}
            disabled={isAppleRequesting}
          >
            <AppleLogo aria-hidden="true" />
            <span>Apple로 로그인</span>
          </S.AppleButton>
          <S.KakaoButton
            type="button"
            onClick={requestKakaoLogin}
            disabled={isKakaoRequesting}
          >
            <KakaoLogo aria-hidden="true" />
            <span>카카오로 로그인하기</span>
          </S.KakaoButton>
          {/* NOTE: 카카오 로그인은 웹뷰 브릿지가 필요해 일반 브라우저에서 테스트 불가.
              dev 환경에서만 존재하는 BE의 /auth/login/dev로 우회 로그인 제공.
              VITE_ENVIRONMENT 기준이므로 npm run dev, npm run build:development 모두 노출됨 */}
          {import.meta.env.VITE_ENVIRONMENT === "development" && (
            <Button
              variant="underlined"
              text="[DEV] 아이디/비밀번호로 로그인"
              onClick={() => setIsDevLoginOpen(true)}
            />
          )}
          <DevLoginModal
            isOpen={isDevLoginOpen}
            onClose={() => setIsDevLoginOpen(false)}
            redirectTo={redirectTo}
          />
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
