export interface TermsAgreementState {
  isServiceTermsAgreed: boolean;
  isPrivacyPolicyAgreed: boolean;
  isMarketingAgreed: boolean;
}

export const INITIAL_TERMS_STATE: TermsAgreementState = {
  isServiceTermsAgreed: false,
  isPrivacyPolicyAgreed: false,
  isMarketingAgreed: false,
};

export interface TermsItem {
  key: keyof TermsAgreementState;
  label: string;
  required: boolean;
  /** 클릭 시 모달로 전체 내용을 보여줄 약관. undefined면 모달 없음 */
  modalContent?: string;
}
