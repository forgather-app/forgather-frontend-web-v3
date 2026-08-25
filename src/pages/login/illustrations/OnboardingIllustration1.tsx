import { Lottie } from "lottie-react";
import onboarding1Animation from "@/assets/animations/onboarding1.json";
import * as S from "./OnboardingIllustration1.styles";

const OnboardingIllustration1 = () => {
  return (
    <S.Wrapper aria-hidden="true">
      <Lottie src={onboarding1Animation} loop autoplay />
    </S.Wrapper>
  );
};

export default OnboardingIllustration1;
