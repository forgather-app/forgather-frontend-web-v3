import axios from "axios";
import { getAccessToken } from "./authToken";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: 서버 에러 응답 구조 확정 후 아래 항목 구현 필요
    // - 공통 에러 타입 정의 (e.g. { code: string; message: string })
    // - 401 Unauthorized: accessToken 만료 시 refreshToken으로 재발급 후 재요청
    // - 403 Forbidden: 권한 없음 처리
    // - 비즈니스 에러 코드별 분기 처리

    return Promise.reject(error);
  },
);
