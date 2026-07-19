import type {
  Term,
  TermsAgreementState,
} from "@/pages/signUp/components/termsAgreement/TermsAgreement.type";

export const validateTerms = (
  state: TermsAgreementState,
  terms: Term[],
): boolean =>
  terms.length > 0 &&
  terms.filter((term) => term.isRequired).every((term) => state[term.id]);

export const isAllTermsAgreed = (
  state: TermsAgreementState,
  terms: Term[],
): boolean => terms.length > 0 && terms.every((term) => state[term.id]);
