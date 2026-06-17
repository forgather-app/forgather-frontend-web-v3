import type { TermsAgreementState } from "@/pages/signUp/types";

export const validateTerms = (state: TermsAgreementState): boolean =>
  state.isServiceTermsAgreed && state.isPrivacyPolicyAgreed;
