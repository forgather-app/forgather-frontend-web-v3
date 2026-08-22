import { CONSTRAINTS } from "@/constants/constraints";
import { getGraphemeLength } from "@/utils/getGraphemeLength";

export const SPACE_NAME_REQUIRED_ERROR = "스페이스명을 입력해주세요.";
export const SPACE_NAME_MAX_LENGTH_ERROR = `${CONSTRAINTS.CREATE_SPACE.NAME_MAX_LENGTH}자 이내로 입력해주세요.`;
export const SPACE_DESCRIPTION_MAX_LENGTH_ERROR = `${CONSTRAINTS.CREATE_SPACE.DESCRIPTION_MAX_LENGTH}자 이내로 입력해주세요.`;
export const SPACE_LINK_NAME_MAX_LENGTH_ERROR = `${CONSTRAINTS.CREATE_SPACE.LINK_NAME_MAX_LENGTH}자 이내로 입력해주세요.`;
export const SPACE_LINK_URL_FORMAT_ERROR = "올바른 URL 형식을 입력해주세요.";
/** 링크 URL 입력 필드에서 고정으로 노출되는, 삭제 불가능한 프로토콜 prefix */
export const SPACE_LINK_URL_PREFIX = "https://";

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

export const validateSpaceLinkNameMaxLength = (value: string): true | string =>
  getGraphemeLength(value) <= CONSTRAINTS.CREATE_SPACE.LINK_NAME_MAX_LENGTH ||
  SPACE_LINK_NAME_MAX_LENGTH_ERROR;

/** value는 SPACE_LINK_URL_PREFIX(https://)를 제외한 나머지 부분 */
export const validateSpaceLinkUrlFormat = (value: string): true | string => {
  const trimmed = value.trim();
  if (!trimmed) return true;

  try {
    new URL(`${SPACE_LINK_URL_PREFIX}${trimmed}`);
    return true;
  } catch {
    return SPACE_LINK_URL_FORMAT_ERROR;
  }
};
