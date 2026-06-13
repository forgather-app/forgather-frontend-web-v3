import FunnelLayout from "@/shared/funnel/FunnelLayout";
import useFunnel from "@/shared/funnel/useFunnel";
import DescriptionStep from "./steps/DescriptionStep";
import ImageStep from "./steps/ImageStep";
import InformationStep from "./steps/InformationStep";

const STEPS = ["image", "description", "information"] as const;

const TITLE_META = {
  image: "대표 이미지를\n설정해 주세요!",
  description: "전시에 대한 설명을\n작성해 주세요!",
  information: "전시에 대한 정보를\n작성해 주세요!",
} satisfies Record<(typeof STEPS)[number], string>;

interface CreateExhibitionFunnelData
  extends Record<(typeof STEPS)[number], unknown> {
  image: {
    image: Blob | null;
  };
  description: {
    title: string;
    description: string;
  };
  information: {
    date: string;
    operatingHours: string;
    location: "online" | "offline" | null;
  };
}

const INITIAL_DATA: CreateExhibitionFunnelData = {
  image: { image: null },
  description: { title: "", description: "" },
  information: { date: "", operatingHours: "", location: null },
};

type StepType = typeof STEPS;
type DataType = CreateExhibitionFunnelData;

const CreateExhibitionFunnel = () => {
  const { currentStepIndex, onNext } = useFunnel<StepType, DataType>({
    steps: STEPS,
    initialData: INITIAL_DATA,
  });

  const currentStep = STEPS[currentStepIndex];
  return (
    <FunnelLayout
      stepIndex={currentStepIndex}
      totalSteps={STEPS.length}
      title={TITLE_META[currentStep]}
    >
      {currentStep === "image" && <ImageStep onNext={onNext} />}
      {currentStep === "description" && <DescriptionStep onNext={onNext} />}
      {currentStep === "information" && <InformationStep onNext={onNext} />}
    </FunnelLayout>
  );
};

export default CreateExhibitionFunnel;
