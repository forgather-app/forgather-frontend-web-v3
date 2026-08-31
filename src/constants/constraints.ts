export const CONSTRAINTS = {
  BOTTOM_SHEET_CLOSE_THRESHOLD: 20,
  HEADER_HIDE_SCROLL_THRESHOLD: 10,
  SNACKBAR_CLOSE_THRESHOLD: 80,
  /** 스켈레톤 UI를 표시하기까지 대기할 시간(ms). 이보다 빨리 로딩이 끝나면 스켈레톤을 보여주지 않는다 */
  SKELETON_LOADING_DELAY: 200,

  SIGN_UP: {
    ARTIST_NAME_MAX_LENGTH: 20,
  },

  PROFILE: {
    NICKNAME_MAX_LENGTH: 10,
    INTRO_MAX_LENGTH: 50,
  },

  PRODUCT: {
    TITLE_MAX_LENGTH: 50,
    AUTHOR_NAME_MAX_LENGTH: 35,
    DESCRIPTION_MAX_LENGTH: 2000,
    VIDEO_URL_MAX_LENGTH: 500,
    MAX_PHOTO_COUNT: 10,
  },

  GUEST_BOOK_WRITE: {
    // API 스펙(WriteGuestBookCardRequest.nickname @maxLength 10)과 일치시킨다
    NICKNAME_MAX_LENGTH: 10,
    MESSAGE_MAX_LENGTH: 400,
    MAX_PHOTO_COUNT: 10,
  },

  CREATE_SPACE: {
    NAME_MAX_LENGTH: 50,
    DESCRIPTION_MAX_LENGTH: 200,
    LINK_NAME_MAX_LENGTH: 20,
  },

  IMAGE: {
    /** presigned URL 업로드용 webp 변환 시 긴 변 최대 길이(px) */
    UPLOAD_MAX_DIMENSION: 1920,
    /** presigned URL 업로드용 webp 변환 품질(0~1) */
    UPLOAD_QUALITY: 0.9,
  },

  GUEST_BOOK_LIST: {
    PAGE_SIZE: 20,
  },
};
