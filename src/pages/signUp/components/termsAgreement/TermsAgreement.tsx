import { useState } from "react";
import ReactMarkdown from "react-markdown";
import IcBack from "@/assets/icons/ic_back.svg?react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import IcRectangleCheck from "@/assets/icons/ic_rectangle_check.svg?react";
import Modal from "@/components/UI/Modal/Modal";
import { MarkdownContent } from "@/styles/@common/Markdown/Markdown.styles";
import * as S from "./TermsAgreement.styles";
import type { Term, TermsAgreementState } from "./TermsAgreement.type";

interface TermsAgreementProps {
  /** 조회된 약관 목록 */
  terms: Term[];
  /** 현재 약관 동의 상태 */
  value: TermsAgreementState;
  /** 약관 동의 상태 변경 핸들러 */
  onChange: (state: TermsAgreementState) => void;
  /** 약관 목록 조회 중 여부. true면 전체 동의 영역을 비활성화하고 흐리게 표시합니다. */
  isLoading?: boolean;
}

const TermsAgreement = ({
  terms,
  value,
  onChange,
  isLoading = false,
}: TermsAgreementProps) => {
  const [modalTerm, setModalTerm] = useState<Term | null>(null);

  const isAllAgreed = terms.length > 0 && terms.every((term) => value[term.id]);

  const handleAllAgree = () => {
    const next = !isAllAgreed;
    onChange(Object.fromEntries(terms.map((term) => [term.id, next])));
  };

  const handleItemToggle = (id: number) => {
    onChange({ ...value, [id]: !value[id] });
  };

  return (
    <>
      <S.Wrapper>
        <S.AllAgreeRow>
          <S.AllAgreeLabel htmlFor="terms-all" $dimmed={isLoading}>
            전체 동의
          </S.AllAgreeLabel>
          <S.CheckboxWrapper>
            <S.HiddenInput
              type="checkbox"
              id="terms-all"
              checked={isAllAgreed}
              onChange={handleAllAgree}
              disabled={isLoading}
              aria-label="전체 동의"
            />
            <S.CheckIcon $checked={isAllAgreed} $dimmed={isLoading} aria-hidden>
              <IcRectangleCheck width={28} height={28} />
            </S.CheckIcon>
          </S.CheckboxWrapper>
        </S.AllAgreeRow>

        <S.ItemList>
          {terms.map((term) => (
            <S.ItemRow key={term.id}>
              <S.ItemLabel
                type="button"
                $hasModal={!!term.content}
                onClick={() => term.content && setModalTerm(term)}
                aria-haspopup={term.content ? "dialog" : undefined}
              >
                {term.isRequired ? (
                  <S.RequiredBadge aria-label="필수">[필수]</S.RequiredBadge>
                ) : (
                  <S.OptionalBadge aria-label="선택">[선택]</S.OptionalBadge>
                )}
                <S.LabelText>{term.name}</S.LabelText>
                {term.content && (
                  <S.ChevronIcon aria-hidden="true">
                    <IcBack
                      width={16}
                      height={16}
                      style={{ transform: "rotate(-90deg)" }}
                    />
                  </S.ChevronIcon>
                )}
              </S.ItemLabel>
              <S.CheckboxWrapper>
                <S.HiddenInput
                  type="checkbox"
                  id={`terms-${term.id}`}
                  checked={!!value[term.id]}
                  onChange={() => handleItemToggle(term.id)}
                  aria-label={term.name}
                />
                <S.CheckIcon $checked={!!value[term.id]} aria-hidden>
                  <IcRectangleCheck width={28} height={28} />
                </S.CheckIcon>
              </S.CheckboxWrapper>
            </S.ItemRow>
          ))}
        </S.ItemList>
      </S.Wrapper>

      <Modal isOpen={!!modalTerm} onClose={() => setModalTerm(null)}>
        <Modal.Overlay />
        <Modal.Content>
          {modalTerm && (
            <S.ModalInner>
              <S.ModalHeader>
                <S.ModalTitle>{modalTerm.name}</S.ModalTitle>
                <S.ModalCloseButton
                  type="button"
                  aria-label="닫기"
                  onClick={() => setModalTerm(null)}
                >
                  <IcClose aria-hidden width={24} height={24} />
                </S.ModalCloseButton>
              </S.ModalHeader>
              <S.ModalBody>
                <MarkdownContent>
                  <ReactMarkdown>{modalTerm.content ?? ""}</ReactMarkdown>
                </MarkdownContent>
              </S.ModalBody>
            </S.ModalInner>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TermsAgreement;
