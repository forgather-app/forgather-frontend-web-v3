import type {
  Term,
  TermsAgreementState,
} from "@/pages/signUp/components/termsAgreement/TermsAgreement.type";

export const validateTerms = (
  state: TermsAgreementState,
  terms: Term[],
): boolean =>
  terms.filter((term) => term.isRequired).every((term) => state[term.id]);
