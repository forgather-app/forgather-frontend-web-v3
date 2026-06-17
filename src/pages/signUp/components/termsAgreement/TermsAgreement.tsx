import { useState } from "react";
import IcBack from "@/assets/icons/ic_back.svg?react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import IcRectangleCheck from "@/assets/icons/ic_rectangle_check.svg?react";
import Modal from "@/components/UI/Modal/Modal";
import type { TermsItem } from "@/constants/terms";
import { TERMS_ITEMS } from "@/constants/terms";
import * as S from "./TermsAgreement.styles";
import type { TermsAgreementState } from "./TermsAgreement.type";

interface TermsAgreementProps {
  /** 현재 약관 동의 상태 */
  value: TermsAgreementState;
  /** 약관 동의 상태 변경 핸들러 */
  onChange: (state: TermsAgreementState) => void;
}

const TermsAgreement = ({ value, onChange }: TermsAgreementProps) => {
  const [modalItem, setModalItem] = useState<TermsItem | null>(null);

  const isAllAgreed = TERMS_ITEMS.every((item) => value[item.key]);

  const handleAllAgree = () => {
    const next = !isAllAgreed;
    onChange({
      isServiceTermsAgreed: next,
      isPrivacyPolicyAgreed: next,
      isMarketingAgreed: next,
    });
  };

  const handleItemToggle = (key: keyof TermsAgreementState) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <>
      <S.Wrapper>
        <S.AllAgreeRow>
          <S.AllAgreeLabel htmlFor="terms-all">전체 동의</S.AllAgreeLabel>
          <S.CheckboxWrapper>
            <S.HiddenInput
              type="checkbox"
              id="terms-all"
              checked={isAllAgreed}
              onChange={handleAllAgree}
              aria-label="전체 동의"
            />
            <S.CheckIcon $checked={isAllAgreed} aria-hidden>
              <IcRectangleCheck width={28} height={28} />
            </S.CheckIcon>
          </S.CheckboxWrapper>
        </S.AllAgreeRow>

        <S.ItemList>
          {TERMS_ITEMS.map((item) => (
            <S.ItemRow key={item.key}>
              <S.ItemLabel
                type="button"
                $hasModal={!!item.modalContent}
                onClick={() => item.modalContent && setModalItem(item)}
                aria-haspopup={item.modalContent ? "dialog" : undefined}
              >
                {item.required ? (
                  <S.RequiredBadge aria-label="필수">[필수]</S.RequiredBadge>
                ) : (
                  <S.OptionalBadge aria-label="선택">[선택]</S.OptionalBadge>
                )}
                <S.LabelText>{item.label}</S.LabelText>
                {item.modalContent && (
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
                  id={`terms-${item.key}`}
                  checked={value[item.key]}
                  onChange={() => handleItemToggle(item.key)}
                  aria-label={item.label}
                />
                <S.CheckIcon $checked={value[item.key]} aria-hidden>
                  <IcRectangleCheck width={28} height={28} />
                </S.CheckIcon>
              </S.CheckboxWrapper>
            </S.ItemRow>
          ))}
        </S.ItemList>
      </S.Wrapper>

      <Modal isOpen={!!modalItem} onClose={() => setModalItem(null)}>
        <Modal.Overlay />
        <Modal.Content>
          {modalItem && (
            <S.ModalInner>
              <S.ModalHeader>
                <S.ModalTitle>{modalItem.label}</S.ModalTitle>
                <S.ModalCloseButton
                  type="button"
                  aria-label="닫기"
                  onClick={() => setModalItem(null)}
                >
                  <IcClose aria-hidden width={24} height={24} />
                </S.ModalCloseButton>
              </S.ModalHeader>
              <S.ModalBody>{modalItem.modalContent}</S.ModalBody>
            </S.ModalInner>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TermsAgreement;
