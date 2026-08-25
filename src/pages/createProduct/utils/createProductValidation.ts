import { CONSTRAINTS } from "@/constants/constraints";
import { checkIsYoutube } from "@/utils/checkIsYoutube";
import { getGraphemeLength } from "@/utils/getGraphemeLength";

export const PRODUCT_TITLE_REQUIRED_ERROR = "작품 제목을 입력해주세요.";
export const PRODUCT_TITLE_MAX_LENGTH_ERROR = `${CONSTRAINTS.PRODUCT.TITLE_MAX_LENGTH}자 이내로 입력해주세요.`;
export const PRODUCT_AUTHOR_NAME_MAX_LENGTH_ERROR = `${CONSTRAINTS.PRODUCT.AUTHOR_NAME_MAX_LENGTH}자 이내로 입력해주세요.`;
export const PRODUCT_DESCRIPTION_MAX_LENGTH_ERROR = `${CONSTRAINTS.PRODUCT.DESCRIPTION_MAX_LENGTH}자 이내로 입력해주세요.`;
export const PRODUCT_VIDEO_URL_MAX_LENGTH_ERROR = `${CONSTRAINTS.PRODUCT.VIDEO_URL_MAX_LENGTH}자 이내로 입력해주세요.`;
export const PRODUCT_VIDEO_URL_FORMAT_ERROR =
  "올바른 유튜브 링크를 입력해주세요.";

/** react-hook-form validate 규칙 — 통과 시 true, 실패 시 에러 메시지 반환 */
export const validateProductTitleRequired = (value: string): true | string =>
  value.trim().length > 0 || PRODUCT_TITLE_REQUIRED_ERROR;

export const validateProductTitleMaxLength = (value: string): true | string =>
  getGraphemeLength(value) <= CONSTRAINTS.PRODUCT.TITLE_MAX_LENGTH ||
  PRODUCT_TITLE_MAX_LENGTH_ERROR;

export const validateProductAuthorNameMaxLength = (
  value: string,
): true | string =>
  getGraphemeLength(value) <= CONSTRAINTS.PRODUCT.AUTHOR_NAME_MAX_LENGTH ||
  PRODUCT_AUTHOR_NAME_MAX_LENGTH_ERROR;

export const validateProductDescriptionMaxLength = (
  value: string,
): true | string =>
  getGraphemeLength(value) <= CONSTRAINTS.PRODUCT.DESCRIPTION_MAX_LENGTH ||
  PRODUCT_DESCRIPTION_MAX_LENGTH_ERROR;

export const validateProductVideoUrlMaxLength = (
  value: string,
): true | string =>
  getGraphemeLength(value) <= CONSTRAINTS.PRODUCT.VIDEO_URL_MAX_LENGTH ||
  PRODUCT_VIDEO_URL_MAX_LENGTH_ERROR;

/** 영상 링크는 선택 입력이라 빈 값은 통과시키고, 값이 있으면 유튜브 링크 형식만 허용 */
export const validateProductVideoUrlFormat = (value: string): true | string =>
  value.trim().length === 0 ||
  checkIsYoutube(value.trim()) ||
  PRODUCT_VIDEO_URL_FORMAT_ERROR;
