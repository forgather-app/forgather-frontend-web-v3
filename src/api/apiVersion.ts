/**
 * 버전이 나뉘어 있는 API 호출 시 x-api-version 헤더를 붙여주는 헬퍼.
 * orval 생성 훅의 `request` 옵션에 그대로 전달한다.
 *
 * @example
 * useGetV3(spaceId, { request: withApiVersion(3) })
 */
export const withApiVersion = (version: number): RequestInit => ({
  headers: { "x-api-version": String(version) },
});
