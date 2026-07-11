import type { TermResponse } from "@/api/model";

/** id가 보장된 약관 응답 */
export type Term = TermResponse & { id: number };

/** 약관 id를 key로 하는 동의 상태 */
export type TermsAgreementState = Record<number, boolean>;

export const INITIAL_TERMS_STATE: TermsAgreementState = {};
