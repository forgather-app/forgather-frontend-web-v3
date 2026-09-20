type GuestRouteMatcher = {
  pattern: RegExp;
  buildPath: (match: RegExpMatchArray) => string;
};

const GUEST_ROUTE_MATCHERS: GuestRouteMatcher[] = [
  {
    pattern: /^\/guest\/([^/]+)\/(?:home|work-list)$/,
    buildPath: ([, spaceCode]) => `/spaces/${spaceCode}/guest`,
  },
  {
    pattern: /^\/guest\/([^/]+)\/work-detail\/([^/]+)$/,
    buildPath: ([, spaceCode, workId]) =>
      `/spaces/${spaceCode}/guest/artworks/${workId}`,
  },
  {
    pattern: /^\/guest\/([^/]+)\/guestbook$/,
    buildPath: ([, spaceCode]) => `/spaces/${spaceCode}/guest/guestbook`,
  },
  {
    pattern: /^\/guest\/([^/]+)\/guestbook\/([^/]+)$/,
    buildPath: ([, spaceCode, guestbookCardId]) =>
      `/spaces/${spaceCode}/guest/guestbook/${guestbookCardId}`,
  },
  {
    pattern: /^\/guest\/([^/]+)\/create-guestbook$/,
    buildPath: ([, spaceCode]) => `/spaces/${spaceCode}/guest/guestbook/write`,
  },
  {
    // v3에는 별도 완료 페이지가 없어 방명록 목록으로 대체한다.
    pattern: /^\/guest\/([^/]+)\/create-guestbook-complete$/,
    buildPath: ([, spaceCode]) => `/spaces/${spaceCode}/guest/guestbook`,
  },
];

// v2 전용 경로 중 v3에 대응 라우트가 없는(=충돌 가능성 없는) 것만 랜딩으로 리다이렉트한다.
// v2의 `/`, `/login`은 v3 자체 라우트와 겹치므로 여기 포함하지 않는다 — v3 라우터가 정상 처리한다.
const LEGACY_HOST_ROUTE_PATTERNS: RegExp[] = [
  /^\/host(\/.*)?$/,
  /^\/auth\/login\/kakao$/,
];

/**
 * v2 레거시 경로를 v3 경로로 변환한다. v3가 루트(`/`)에 배포되므로, v3 자체 라우트와
 * 겹치지 않는 v2 전용 경로만 명시적으로 매칭해 리다이렉트 대상을 반환하고, 그 외(v3 자체
 * 라우트 포함)는 null을 반환해 라우터가 정상적으로 처리하도록 한다.
 * 게스트 경로는 대응되는 v3 게스트 경로로, 호스트 경로는 v3 랜딩으로 매핑한다.
 * (참고: docs/domain-migration-legacy-url-handling.md)
 */
export const getLegacyV2RedirectPath = (
  pathname: string,
  search: string,
): string | null => {
  for (const { pattern, buildPath } of GUEST_ROUTE_MATCHERS) {
    const match = pathname.match(pattern);
    if (match) {
      return `${buildPath(match)}${search}`;
    }
  }

  const isLegacyHostRoute = LEGACY_HOST_ROUTE_PATTERNS.some((pattern) =>
    pattern.test(pathname),
  );
  if (isLegacyHostRoute) {
    return "/landing?from=legacy-host";
  }

  return null;
};
