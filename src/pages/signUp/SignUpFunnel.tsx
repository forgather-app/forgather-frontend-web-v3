import { useRouter } from "@tanstack/react-router";
import FunnelLayout from "@/shared/funnel/FunnelLayout";
import useFunnel from "@/shared/funnel/useFunnel";
import ArtistNameStep from "./steps/ArtistNameStep";

const STEPS = ["artistName"] as const;

const TITLE_META = {
  artistName: "작가님의 닉네임을 알려주세요",
} satisfies Record<(typeof STEPS)[number], string>;

interface SignUpFunnelData {
  artistName: { artistName: string };
}

const INITIAL_DATA: SignUpFunnelData = {
  artistName: { artistName: "" },
};

const SignUpFunnel = () => {
  const { history } = useRouter();
  const { currentStepIndex, onNext, onPrev } = useFunnel<
    typeof STEPS,
    SignUpFunnelData
  >({
    steps: STEPS,
    initialData: INITIAL_DATA,
  });

  return (
    <FunnelLayout
      stepIndex={currentStepIndex}
      totalSteps={STEPS.length}
      title={TITLE_META[STEPS[currentStepIndex]]}
      onBackClick={currentStepIndex > 0 ? onPrev : () => history.back()}
    >
      {STEPS[currentStepIndex] === "artistName" && (
        <ArtistNameStep onNext={onNext} />
      )}
    </FunnelLayout>
  );
};

export default SignUpFunnel;
