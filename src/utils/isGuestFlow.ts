/**
 * 현재 매칭된 라우트 중 `_appOnly`(호스트 전용, 인증 필요) 하위가 하나도 없으면
 * 게스트(비로그인 접근 가능) flow로 판단한다. `src/routes/_appOnly.tsx`의 컨벤션 참고 —
 * 게스트용 조회/방명록 작성 페이지는 이 레이아웃 밖에 둔다.
 */
export const isGuestFlow = (matches: { routeId: string }[]): boolean =>
  !matches.some((match) => match.routeId.startsWith("/_appOnly"));
