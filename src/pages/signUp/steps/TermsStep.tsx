import { useState } from "react";
import {
  INITIAL_TERMS_STATE,
  type TermsAgreementState,
} from "@/constants/terms";
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

  const isValid = validateTerms(terms);

  return (
    <ItemLayout
      text="다음"
      disabled={!isValid}
      onClick={() => onNext({ terms })}
    >
      <S.Spacer />
      <TermsAgreement value={terms} onChange={setTerms} />
    </ItemLayout>
  );
};

export default TermsStep;
