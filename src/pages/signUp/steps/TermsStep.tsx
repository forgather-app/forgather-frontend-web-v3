import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSubmitOnboarding } from "@/api/generated/auth-인증";
import { useGetLatestTerms } from "@/api/generated/term-약관";
import type { ApiResponseListTermResponse } from "@/api/model";
import Button from "@/components/@common/Button/Button";
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
  // NOTE: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 런타임 값은 JSON이라 안전하게 캐스팅
  const {
    data: termsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetLatestTerms();
  const terms = useMemo<Term[]>(() => {
    const data =
      (termsResponse as unknown as ApiResponseListTermResponse | undefined)
        ?.data ?? [];

    return data
      .filter((term): term is Term => term.id !== undefined)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }, [termsResponse]);

  const isValid = validateTerms(agreement, terms);

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
      disabled={isLoading || !isValid || isPending}
      onClick={handleNext}
    >
      <S.Spacer />
      {isError ? (
        <S.StatusWrapper>
          <S.StatusText>{ERROR_MESSAGES.TERMS_FETCH_FAILED}</S.StatusText>
          <Button
            variant="secondary"
            text="다시 시도"
            onClick={() => refetch()}
          />
        </S.StatusWrapper>
      ) : (
        <TermsAgreement
          terms={terms}
          value={agreement}
          onChange={setAgreement}
          isLoading={isLoading}
        />
      )}
    </ItemLayout>
  );
};

export default TermsStep;
