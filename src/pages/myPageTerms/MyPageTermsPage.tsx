import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  getGetMyTermAgreementsQueryKey,
  useAgreeTerm,
  useGetMyTermAgreementsSuspense,
  useWithdrawTerm,
} from "@/api/generated/term-약관";
import type {
  ApiResponseListTermAgreementResponse,
  TermAgreementResponse,
} from "@/api/model";
import IcCheckmark from "@/assets/icons/ic_checkmark.svg?react";
import IcChevronRight from "@/assets/icons/ic_chevron_right.svg?react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import NavigationBarLayout from "@/components/layout/NavigationBarLayout/NavigationBarLayout";
import Modal from "@/components/UI/Modal/Modal";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import { MarkdownContent } from "@/styles/@common/Markdown/Markdown.styles";
import * as S from "./MyPageTermsPage.styles";

/** id가 보장된 약관 동의 현황 응답 */
type Term = TermAgreementResponse & { id: number };

const MyPageTermsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const [activeTerm, setActiveTerm] = useState<Term | null>(null);

  const { data: terms } = useGetMyTermAgreementsSuspense<Term[]>({
    query: {
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (
          (response as unknown as ApiResponseListTermAgreementResponse).data ??
          []
        )
          .filter((term): term is Term => term.id !== undefined)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    },
  });

  const { mutate: agreeTerm, isPending: isAgreePending } = useAgreeTerm();
  const { mutate: withdrawTerm, isPending: isWithdrawPending } =
    useWithdrawTerm();
  const isTogglePending = isAgreePending || isWithdrawPending;

  const handleToggle = (term: Term) => {
    if (isTogglePending) return;

    const onSuccess = () =>
      queryClient.invalidateQueries({
        queryKey: getGetMyTermAgreementsQueryKey(),
      });

    if (term.isAgreed) {
      withdrawTerm(
        { termId: term.id },
        {
          onSuccess,
          onError: () =>
            showSnackBar(ERROR_MESSAGES.TERM_WITHDRAW_FAILED, "error"),
        },
      );
    } else {
      agreeTerm(
        { termId: term.id },
        {
          onSuccess,
          onError: () =>
            showSnackBar(ERROR_MESSAGES.TERM_AGREE_FAILED, "error"),
        },
      );
    }
  };

  return (
    <NavigationBarLayout
      title="서비스 이용 약관"
      onBackClick={() => navigate({ to: "/my-page" })}
    >
      <S.Gap aria-hidden="true" />
      <S.TermList>
        {terms.map((term) => (
          <li key={term.id}>
            <S.TermRow>
              <S.TermLabelButton
                type="button"
                onClick={() => setActiveTerm(term)}
                aria-haspopup="dialog"
              >
                <S.TermLabelText>{term.name}</S.TermLabelText>
                <IcChevronRight aria-hidden="true" />
              </S.TermLabelButton>
              {term.isRequired ? (
                term.isAgreed && <S.AgreedLabel>동의함</S.AgreedLabel>
              ) : (
                <S.CheckboxWrapper>
                  <S.HiddenInput
                    type="checkbox"
                    checked={!!term.isAgreed}
                    disabled={isTogglePending}
                    onChange={() => handleToggle(term)}
                    aria-label={term.name}
                  />
                  <S.CheckIcon $checked={!!term.isAgreed} aria-hidden>
                    <IcCheckmark width={11} height={8} />
                  </S.CheckIcon>
                </S.CheckboxWrapper>
              )}
            </S.TermRow>
          </li>
        ))}
      </S.TermList>

      <Modal isOpen={!!activeTerm} onClose={() => setActiveTerm(null)}>
        <Modal.Overlay />
        <Modal.Content>
          {activeTerm && (
            <S.ModalInner>
              <S.ModalHeader>
                <S.ModalTitle>{activeTerm.name}</S.ModalTitle>
                <S.ModalCloseButton
                  type="button"
                  aria-label="닫기"
                  onClick={() => setActiveTerm(null)}
                >
                  <IcClose aria-hidden width={24} height={24} />
                </S.ModalCloseButton>
              </S.ModalHeader>
              <S.ModalBody>
                <MarkdownContent>
                  <ReactMarkdown>{activeTerm.content ?? ""}</ReactMarkdown>
                </MarkdownContent>
              </S.ModalBody>
            </S.ModalInner>
          )}
        </Modal.Content>
      </Modal>
    </NavigationBarLayout>
  );
};

export default MyPageTermsPage;
