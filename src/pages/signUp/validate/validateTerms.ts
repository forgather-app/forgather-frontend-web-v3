import { TERMS_ITEMS, type TermsAgreementState } from "@/constants/terms";

export const validateTerms = (state: TermsAgreementState): boolean =>
  TERMS_ITEMS.filter((item) => item.required).every((item) => state[item.key]);
