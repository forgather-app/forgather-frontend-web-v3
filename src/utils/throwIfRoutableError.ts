import { throwIfNotFound } from "./throwIfNotFound";

/**
 * 페이지 렌더링을 가로막아야 하는 쿼리 에러를 감지해 라우터가 처리하도록 다시 던진다.
 * 404(notFound 마커)는 공통 NotFoundPage로, 그 외 모든 에러(5xx/네트워크/403 등)는
 * 그대로 다시 던져 전역 에러 모달(RootErrorBoundary)로 폴백하게 한다. 페이지가 로컬로
 * "정보를 불러오지 못했어요" 같은 자체 에러 UI를 만들지 않도록, `isPending`/`isError`로
 * 분기하는 페이지의 에러 처리 진입점에서 사용한다.
 */
export const throwIfRoutableError = (...errors: unknown[]) => {
  throwIfNotFound(...errors);

  const otherError = errors.find((error) => error != null);
  if (otherError) throw otherError;
};
