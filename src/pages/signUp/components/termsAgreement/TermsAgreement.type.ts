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
