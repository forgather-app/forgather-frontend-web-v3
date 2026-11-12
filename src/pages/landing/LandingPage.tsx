import LandingFeatureList from "./components/LandingFeatureList/LandingFeatureList";
import LandingFinalCta from "./components/LandingFinalCta/LandingFinalCta";
import LandingFooter from "./components/LandingFooter/LandingFooter";
import LandingHero from "./components/LandingHero/LandingHero";
import LandingProblem from "./components/LandingProblem/LandingProblem";
import LandingSlogan from "./components/LandingSlogan/LandingSlogan";
import * as S from "./LandingPage.styles";

const LandingPage = () => {
  return (
    <S.Wrapper>
      <LandingHero />
      <LandingProblem />
      <LandingSlogan />
      <LandingFeatureList />
      <LandingFinalCta />
      <LandingFooter />
    </S.Wrapper>
  );
};

export default LandingPage;
