import { notFound } from "@tanstack/react-router";
import type { AxiosError } from "axios";

/**
 * AxiosError에 TanStack Router의 notFound() 마커(isNotFound: true)를 얹는다.
 * axios 에러 형태(isAxiosError, response 등)는 그대로 유지되므로, 이 마커가 붙은
 * 뒤에도 isAxiosError 기반의 다른 판별(예: isForbiddenError)은 영향받지 않는다.
 */
export const markNotFoundError = (error: AxiosError) =>
  Object.assign(error, notFound());
