import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  getGetCurrentUserQueryKey,
  useSubmitOnboarding,
} from "@/api/generated/auth-인증";
import { useGetLatestTermsSuspense } from "@/api/generated/term-약관";
import type {
  ApiResponseHostResponse,
  ApiResponseListTermResponse,
} from "@/api/model";
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
  const queryClient = useQueryClient();
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
          // NOTE: useGetCurrentUser는 /sign-up 진입 중엔 disabled라 서버 응답이 갱신돼도
          // 캐시가 온보딩 이전 값(onboardingCompleted: false)에 머무른다.
          // 이 상태로 /sign-up 밖으로 나가면 _authenticated.tsx 가드가 그 stale 값을 보고
          // 다시 /sign-up으로 돌려보내 퍼널이 재시작되는 문제가 있어 성공 시점에 직접 패치한다.
          queryClient.setQueryData(
            getGetCurrentUserQueryKey(),
            (previous: unknown) => {
              const response = previous as ApiResponseHostResponse | undefined;
              if (!response?.data) return previous;
              return {
                ...response,
                data: { ...response.data, onboardingCompleted: true },
              };
            },
          );
          onNext({ terms: agreement });
          navigate({ to: "/sign-up/complete" });
        },
        onError: () => {
          showSnackBar(ERROR_MESSAGES.ONBOARDING_FAILED, "error");
        },
      },
    );
  };

  return (
    <ItemLayout
      button={
        <Button
          variant="tertiary"
          text="시작하기"
          disabled={!validateTerms(agreement, terms) || isPending}
          onClick={handleNext}
        />
      }
    >
      <TermsAgreement terms={terms} value={agreement} onChange={setAgreement} />
    </ItemLayout>
  );
};

export default TermsStep;
