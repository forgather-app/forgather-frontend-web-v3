import { CONSTRAINTS } from "@/constants/constraints";
import { getGraphemeLength } from "@/utils/getGraphemeLength";

export const NICKNAME_REQUIRED_ERROR = "닉네임을 입력해주세요.";
export const NICKNAME_MAX_LENGTH_ERROR = `${CONSTRAINTS.GUEST_BOOK_WRITE.NICKNAME_MAX_LENGTH}자 이내로 입력해주세요.`;
export const MESSAGE_REQUIRED_ERROR = "방명록 내용을 입력해주세요.";
export const MESSAGE_MAX_LENGTH_ERROR = `${CONSTRAINTS.GUEST_BOOK_WRITE.MESSAGE_MAX_LENGTH}자 이내로 입력해주세요.`;

/** react-hook-form validate 규칙 — 통과 시 true, 실패 시 에러 메시지 반환 */
export const validateNicknameRequired = (value: string): true | string =>
  value.trim().length > 0 || NICKNAME_REQUIRED_ERROR;

export const validateNicknameMaxLength = (value: string): true | string =>
  getGraphemeLength(value) <=
    CONSTRAINTS.GUEST_BOOK_WRITE.NICKNAME_MAX_LENGTH ||
  NICKNAME_MAX_LENGTH_ERROR;

export const validateMessageRequired = (value: string): true | string =>
  value.trim().length > 0 || MESSAGE_REQUIRED_ERROR;

export const validateMessageMaxLength = (value: string): true | string =>
  getGraphemeLength(value) <= CONSTRAINTS.GUEST_BOOK_WRITE.MESSAGE_MAX_LENGTH ||
  MESSAGE_MAX_LENGTH_ERROR;
