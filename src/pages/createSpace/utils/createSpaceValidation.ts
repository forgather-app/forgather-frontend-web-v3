import { CONSTRAINTS } from "@/constants/constraints";
import { getGraphemeLength } from "@/utils/getGraphemeLength";

export const SPACE_NAME_REQUIRED_ERROR = "스페이스명을 입력해주세요.";
export const SPACE_NAME_MAX_LENGTH_ERROR = `${CONSTRAINTS.CREATE_SPACE.NAME_MAX_LENGTH}자 이내로 입력해주세요.`;
export const SPACE_DESCRIPTION_MAX_LENGTH_ERROR = `${CONSTRAINTS.CREATE_SPACE.DESCRIPTION_MAX_LENGTH}자 이내로 입력해주세요.`;

/** react-hook-form validate 규칙 — 통과 시 true, 실패 시 에러 메시지 반환 */
export const validateSpaceNameRequired = (value: string): true | string =>
  value.trim().length > 0 || SPACE_NAME_REQUIRED_ERROR;

export const validateSpaceNameMaxLength = (value: string): true | string =>
  getGraphemeLength(value) <= CONSTRAINTS.CREATE_SPACE.NAME_MAX_LENGTH ||
  SPACE_NAME_MAX_LENGTH_ERROR;

export const validateSpaceDescriptionMaxLength = (
  value: string,
): true | string =>
  getGraphemeLength(value) <= CONSTRAINTS.CREATE_SPACE.DESCRIPTION_MAX_LENGTH ||
  SPACE_DESCRIPTION_MAX_LENGTH_ERROR;
