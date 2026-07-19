import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useSubmitOnboarding } from "@/api/generated/auth-인증";
import { useGetLatestTermsSuspense } from "@/api/generated/term-약관";
import type { ApiResponseListTermResponse } from "@/api/model";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import TermsAgreement from "@/pages/signUp/components/termsAgreement/TermsAgreement";
import {
  INITIAL_TERMS_STATE,
  type Term,
  type TermsAgreementState,
} from "@/pages/signUp/components/termsAgreement/TermsAgreement.type";
import { validateTerms } from "@/pages/signUp/validate/validateTerms";
import ItemLayout from "@/shared/funnel/ItemLayout";
import * as S from "./TermsStep.styles";

interface TermsStepProps {
  /** 이전 step(ArtistNameStep)에서 입력한 닉네임 */
  artistName: string;
  initialTerms?: TermsAgreementState;
  onNext: (data: { terms: TermsAgreementState }) => void;
}

const TermsStep = ({
  artistName,
  initialTerms = INITIAL_TERMS_STATE,
  onNext,
}: TermsStepProps) => {
  const [agreement, setAgreement] = useState<TermsAgreementState>(initialTerms);
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { mutate: submitOnboarding, isPending } = useSubmitOnboarding();
  const { data: terms } = useGetLatestTermsSuspense<Term[]>({
    query: {
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        ((response as unknown as ApiResponseListTermResponse).data ?? [])
          .filter((term): term is Term => term.id !== undefined)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    },
  });

  const handleNext = () => {
    submitOnboarding(
      {
        data: {
          nickname: artistName,
          agreedTermIds: terms
            .filter((term) => agreement[term.id])
            .map((term) => term.id),
        },
      },
      {
        onSuccess: () => {
          onNext({ terms: agreement });
          navigate({ to: "/" });
        },
        onError: () => {
          showSnackBar(ERROR_MESSAGES.ONBOARDING_FAILED, "error");
        },
      },
    );
  };

  return (
    <ItemLayout
      text="다음"
      disabled={!validateTerms(agreement, terms) || isPending}
      onClick={handleNext}
    >
      <S.Spacer />
      <TermsAgreement terms={terms} value={agreement} onChange={setAgreement} />
    </ItemLayout>
  );
};

export default TermsStep;
