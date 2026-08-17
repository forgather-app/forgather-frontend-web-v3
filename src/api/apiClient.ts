import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  // NOTE: 인증 토큰은 서버가 쿠키로 내려주므로, withCredentials로 요청마다 자동 전송됨
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: 서버 에러 응답 구조 확정 후 아래 항목 구현 필요
    // - 공통 에러 타입 정의 (e.g. { code: string; message: string })
    // - 401 Unauthorized: accessToken 만료 시 refreshToken으로 재발급 후 재요청
    // - 403 Forbidden: 권한 없음 처리
    // - 비즈니스 에러 코드별 분기 처리
    // NOTE: 404는 공통 처리 대상에서 제외 — 리소스 없음은 각 페이지가 로컬로 분기 처리
    // (예: ArtworkDetailPage의 isNotFound 분기)하거나 라우트 notFound()로 다뤄야 할 케이스라,
    // 여기서 전역 에러 바운더리로 흘려보내지 않음

    return Promise.reject(error);
  },
);
