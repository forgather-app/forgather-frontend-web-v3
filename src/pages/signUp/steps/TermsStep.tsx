import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAgreeTerms } from "@/api/generated/auth-인증";
import { ERROR_MESSAGES } from "@/constants/error";
import {
  INITIAL_TERMS_STATE,
  type TermsAgreementState,
} from "@/constants/terms";
import useSnackBar from "@/hooks/@common/useSnackBar";
import TermsAgreement from "@/pages/signUp/components/termsAgreement/TermsAgreement";
import { validateTerms } from "@/pages/signUp/validate/validateTerms";
import ItemLayout from "@/shared/funnel/ItemLayout";
import * as S from "./TermsStep.styles";

interface TermsStepProps {
  initialTerms?: TermsAgreementState;
  onNext: (data: { terms: TermsAgreementState }) => void;
}

const TermsStep = ({
  initialTerms = INITIAL_TERMS_STATE,
  onNext,
}: TermsStepProps) => {
  const [terms, setTerms] = useState<TermsAgreementState>(initialTerms);
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { mutate: agreeTerms, isPending } = useAgreeTerms();

  const isValid = validateTerms(terms);

  const handleNext = () => {
    agreeTerms(undefined, {
      onSuccess: () => {
        onNext({ terms });
        navigate({ to: "/" });
      },
      onError: () => {
        showSnackBar(ERROR_MESSAGES.TERMS_AGREEMENT_FAILED, "error");
      },
    });
  };

  return (
    <ItemLayout
      text="다음"
      disabled={!isValid || isPending}
      onClick={handleNext}
    >
      <S.Spacer />
      <TermsAgreement value={terms} onChange={setTerms} />
    </ItemLayout>
  );
};

export default TermsStep;
