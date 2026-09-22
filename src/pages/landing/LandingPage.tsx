import { useState } from "react";
import { isDismissedToday } from "@/utils/dailyDismiss";
import LandingAppNoticeModal from "./components/LandingAppNoticeModal/LandingAppNoticeModal";
import LandingFeatureList from "./components/LandingFeatureList/LandingFeatureList";
import LandingFinalCta from "./components/LandingFinalCta/LandingFinalCta";
import LandingFooter from "./components/LandingFooter/LandingFooter";
import LandingHero from "./components/LandingHero/LandingHero";
import LandingProblem from "./components/LandingProblem/LandingProblem";
import LandingSlogan from "./components/LandingSlogan/LandingSlogan";
import { LANDING_APP_NOTICE_DISMISS_KEY } from "./LandingPage.constants";
import * as S from "./LandingPage.styles";

const LandingPage = () => {
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(
    () => !isDismissedToday(LANDING_APP_NOTICE_DISMISS_KEY),
  );

  return (
    <S.Wrapper>
      <LandingHero />
      <LandingProblem />
      <LandingSlogan />
      <LandingFeatureList />
      <LandingFinalCta />
      <LandingFooter />
      <LandingAppNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        dismissStorageKey={LANDING_APP_NOTICE_DISMISS_KEY}
      />
    </S.Wrapper>
  );
};

export default LandingPage;
