# 도메인 이관: 레거시 URL 처리 전략

## 배경

- 신 레포(`forgather-frontend-web-v3`)를 prod에 배포하면 `forgather.app` 도메인으로 나간다.
- 현재 `forgather.app`에는 구 레포(`forgather-frontend-web`, `v2/main` 브랜치)가 배포되어 있다.
- 배포 교체 시 기존 유저가 들고 있는 구 URL(북마크, 공유 링크, 카톡 공유 등)이 신 앱으로 그대로 유입된다.

### 목표 동작

| 유입 케이스 | 원하는 동작 |
| --- | --- |
| 기존 유저가 **게스트 URL**로 방문 | 신 앱의 대응되는 게스트 URL로 리다이렉션 |
| 기존 유저가 **호스트 URL**로 방문 | `forgather.app/landing`(추가 예정)으로 이동 후 **공지 모달** 노출 |
| 신규 유저가 `/landing`에 직접 방문 | 모달 노출하지 않음 |

---

## 결론: 가능하다

구/신 레포 라우팅을 비교했을 때 이 시나리오에 유리한 조건이 갖춰져 있다.

| 조건 | 확인 결과 |
| --- | --- |
| 같은 origin(`forgather.app`)으로 배포 | `localStorage` / 쿠키 / 캐시가 배포 교체 후에도 유지됨 → "기존 유저" 판별 가능 |
| 레거시 URL 경로 네임스페이스 | 구: `/guest/*`, `/host/*` (단수) / 신: `/spaces/*`, `/hosts/*` (복수) → **충돌 없음** |
| 구 앱 Service Worker | **없음** (PWA/workbox 미사용) → "구 앱이 계속 서빙되는" 이관 최대 리스크가 없음 |

### 핵심 인사이트

**"기존 유저 vs 신규 유저"를 따로 판별할 필요가 거의 없다.**
신규 유저는 구 URL(`/guest/...`, `/host/...`)로 진입할 경로가 없으므로,
**레거시 경로 매칭 자체가 "기존 유저" 신호**로 기능한다.

---

## 구현 방향

### 1. 게스트 URL → 신규 게스트 URL 리다이렉션

구 URL 패턴(`v2/main` 기준)이 결정적으로 매핑된다.

| 구 (`forgather-frontend-web` `v2/main`) | 신 (`forgather-frontend-web-v3`) |
| --- | --- |
| `/guest/:code/home` | `/spaces/:code/guest` |
| `/guest/:code/work-list` | `/spaces/:code/guest` |
| `/guest/:code/work-detail/:workId` | `/spaces/:code/guest/artworks/:artworkId` |
| `/guest/:code/guestbook` | `/spaces/:code/guest/guestbook` |
| `/guest/:code/guestbook/:cardId` | `/spaces/:code/guest/guestbook/:guestbookId` |
| `/guest/:code/create-guestbook` | `/spaces/:code/guest/guestbook/write` |
| `/guest/:code/create-guestbook-complete` | (신규 완료 페이지 확인 필요 — 없으면 `/spaces/:code/guest/guestbook`) |

**구현 옵션**

- **A. `vercel.json`의 `redirects`** — 엣지에서 처리되어 화면 깜빡임이 없고, JS 실행 전에 동작한다. 순수 경로 재작성이므로 가장 깔끔하다.
- **B. 신 앱에 `/guest/$code/*` catch-all 라우트** — `beforeLoad`에서 패턴 파싱 후 `redirect()`. 식별자 변환 등 로직이 필요하면 이 방식.

301(영구 리다이렉트)로 처리하면 공유된 링크/SEO도 유지된다. 쿼리스트링·해시는 보존해야 한다.

### 2. 호스트 URL → `/landing` + 공지 모달

구 `/host/*` 전체를 신 앱의 legacy catch-all 라우트에서 받는다.

대상 예시: `/host/main`, `/host/my-page`, `/host/create-space`, `/host/share`,
`/host/:code/home`, `/host/:code/space-info`, `/host/:code/space-info/edit`,
`/host/:code/work-detail/:workId`, `/host/:code/work-detail/:workId/edit`,
`/host/:code/work-list`, `/host/:code/guestbook`, `/host/:code/guestbook/:cardId`

```
/host/*  →  redirect  →  /landing?from=legacy-host
```

`/landing`에서 `from=legacy-host` 쿼리(또는 리다이렉트 직전에 심은 `sessionStorage` 플래그)가
있을 때만 모달을 띄우고, 렌더 후 플래그를 제거한다.

- 신규 유저는 앱스토어 / 광고에서 `/landing`으로 바로 진입 → 이 신호가 없음 → **모달 미노출**
- "한 번만 노출"까지 원하면 `localStorage`에 `migrationNoticeSeen` 기록

### 3. 모달 게이팅 요약

| 신호 원천 | 용도 |
| --- | --- |
| `?from=legacy-host` 쿼리 | 이번 세션에서 레거시 호스트 URL로 진입했는지 |
| `sessionStorage` 플래그 | 쿼리 노출을 원치 않을 때의 대안 |
| `localStorage` `migrationNoticeSeen` | 재방문 시 재노출 방지(선택) |

---

## 배포 전 확인 사항

1. **식별자 동일성**
   구 `spaceCode` / `guestbookCardId` / `workId` 값이
   신 API의 `spaceId` / `guestbookId` / `artworkId`와 같은 값인지 백엔드 확인.
   - 같으면: 순수 경로 매핑으로 종료
   - 다르면: 구→신 식별자 변환용 API 또는 서버리스 함수 1개 필요

2. **`/landing`은 `_appOnly` 레이아웃 밖에 배치**
   현재 `src/routes/_appOnly.tsx`의 `appOnlyBeforeLoad`가 비웹뷰(브라우저) 방문자를
   앱스토어로 리다이렉트한다. `/landing`을 그 안에 두면 호스트가 랜딩을 보기 전에
   스토어로 튕긴다. 게스트 페이지처럼 `_appOnly` 밖에 두어야 한다.

3. **구 앱 인증 쿠키는 v3 API에서 무효**
   구 앱은 쿠키 기반 인증을 썼고, 신 앱도 쿠키 기반이지만 API 버전(v3)이 다르다.
   로그인 상태였던 호스트도 사실상 로그아웃 상태가 된다.
   → 공지 모달 문구에 "앱 다운로드 / 재로그인 안내"를 포함하는 것이 자연스럽다.

4. **브라우저 HTTP 캐시(구 `index.html`)**
   구 앱에 Service Worker가 없어 리스크는 낮다. 다만 구 배포가 HTML에 긴 `max-age`를
   걸어놨다면 일부 유저가 잠시 구 앱을 볼 수 있다. Vercel 기본 헤더 수준이면 대체로 문제없다.

5. **분석/트래킹**
   레거시 리다이렉트에 UTM 또는 이벤트 태그를 붙여 이관 유입량을 측정할 수 있게 한다.

---

## 참고: 구 앱(`v2/main`) 라우트 전체

### 게스트 (`/guest/*`)

- `/guest/:spaceCode/home`
- `/guest/:spaceCode/create-guestbook`
- `/guest/:spaceCode/create-guestbook-complete`
- `/guest/:spaceCode/work-detail/:workId`
- `/guest/:spaceCode/work-list`
- `/guest/:spaceCode/guestbook`
- `/guest/:spaceCode/guestbook/:guestbookCardId`

### 호스트 (`/host/*`, 모두 인증 필요)

- `/host/main`
- `/host/my-page`
- `/host/create-space`
- `/host/share`
- `/host/:spaceCode/home`
- `/host/:spaceCode/space-info`
- `/host/:spaceCode/space-info/edit`
- `/host/:spaceCode/work-detail/:workId`
- `/host/:spaceCode/work-detail/:workId/edit`
- `/host/:spaceCode/work-list`
- `/host/:spaceCode/guestbook`
- `/host/:spaceCode/guestbook/:guestbookCardId`

### 기타

- `/` — LandingPage (구 앱의 루트)
- `/login`
- `/auth/login/kakao`
- `*` — NotFound
