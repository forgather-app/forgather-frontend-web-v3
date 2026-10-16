import { isNotFound, notFound } from "@tanstack/react-router";

/**
 * 여러 쿼리 에러 중 하나라도 404(notFound 마커)면 공통 NotFoundPage로 라우팅되도록
 * TanStack Router의 notFound()를 던진다. `isPending`/`isError`로 분기하는 페이지에서
 * `useQuery`/`useInfiniteQuery`의 error 값과 함께 사용한다.
 */
export const throwIfNotFound = (...errors: unknown[]) => {
  if (errors.some((error) => isNotFound(error))) throw notFound();
};
