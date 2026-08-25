import { Lottie } from "lottie-react";
import onboarding2Animation from "@/assets/animations/onboarding2.json";
import * as S from "./OnboardingIllustration2.styles";

const OnboardingIllustration2 = () => {
  return (
    <S.Wrapper aria-hidden="true">
      <Lottie src={onboarding2Animation} loop autoplay />
    </S.Wrapper>
  );
};

export default OnboardingIllustration2;
