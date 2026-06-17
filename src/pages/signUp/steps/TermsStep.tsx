import { useState } from "react";
import {
  INITIAL_TERMS_STATE,
  type TermsAgreementState,
} from "@/constants/terms";
import TermsAgreement from "@/pages/signUp/components/termsAgreement/TermsAgreement";
import { validateTerms } from "@/pages/signUp/validate/validateTerms";
import ItemLayout from "@/shared/funnel/ItemLayout";

interface TermsStepProps {
  onNext: (data: { terms: TermsAgreementState }) => void;
}

const TermsStep = ({ onNext }: TermsStepProps) => {
  const [terms, setTerms] = useState<TermsAgreementState>(INITIAL_TERMS_STATE);

  const isValid = validateTerms(terms);

  return (
    <ItemLayout
      text="다음"
      disabled={!isValid}
      onClick={() => onNext({ terms })}
    >
      <div style={{ flex: 1 }} />
      <TermsAgreement value={terms} onChange={setTerms} />
    </ItemLayout>
  );
};

export default TermsStep;
