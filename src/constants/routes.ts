// NOTE: forgather.app을 v2/v3가 경로로 나눠 쓰기 위한 prefix. vite.config.ts의
// base 설정과 값을 반드시 맞춰야 한다 (하나만 바뀌면 정적 자산 경로가 깨짐).
export const APP_BASE_PATH = "/v3";

export const CURRENT_SPACE_FALLBACK_IMAGE = `${APP_BASE_PATH}/images/fallback/current_space.png`;
export const EXHIBITION_LIST_FALLBACK_IMAGE = `${APP_BASE_PATH}/images/fallback/exhibition_list.png`;
