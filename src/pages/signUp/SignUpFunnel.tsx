import type { TermsAgreementState } from "@/constants/terms";
import FunnelLayout from "@/shared/funnel/FunnelLayout";
import useFunnel from "@/shared/funnel/useFunnel";
import ArtistNameStep from "./steps/ArtistNameStep";
import TermsStep from "./steps/TermsStep";

const STEPS = ["artistName", "terms"] as const;

const TITLE_META = {
  artistName: "작가님의 닉네임을 알려주세요",
  terms: "원활한 이용을 위해서\n아래 약관에 동의해주세요",
} satisfies Record<(typeof STEPS)[number], string>;

interface SignUpFunnelData extends Record<(typeof STEPS)[number], unknown> {
  artistName: { artistName: string };
  terms: { terms: TermsAgreementState };
}

const INITIAL_DATA: SignUpFunnelData = {
  artistName: { artistName: "" },
  terms: {
    terms: {
      isServiceTermsAgreed: false,
      isPrivacyPolicyAgreed: false,
      isMarketingAgreed: false,
    },
  },
};

type StepType = typeof STEPS;
type DataType = SignUpFunnelData;

const SignUpFunnel = () => {
  const { currentStepIndex, onNext, onPrev } = useFunnel<StepType, DataType>({
    steps: STEPS,
    initialData: INITIAL_DATA,
  });

  return (
    <FunnelLayout
      stepIndex={currentStepIndex}
      totalSteps={STEPS.length}
      title={TITLE_META[STEPS[currentStepIndex]]}
      onBackClick={currentStepIndex > 0 ? onPrev : () => window.history.back()}
    >
      {STEPS[currentStepIndex] === "artistName" && (
        <ArtistNameStep onNext={onNext} />
      )}
      {STEPS[currentStepIndex] === "terms" && (
        <TermsStep initialTerms={INITIAL_DATA.terms.terms} onNext={onNext} />
      )}
    </FunnelLayout>
  );
};

export default SignUpFunnel;
