# PostHog + Sentry 도입 작업 목록

PostHog(제품 분석)와 Sentry(에러 모니터링)를 `forgather-frontend-web-v3`에 도입하기 위해 필요한
작업을 정리한다.

> **[2026-09-24] 핵심 연동 완료.** 에러 트래킹(Sentry, 소스맵 업로드 포함)과 기본 분석
> (PostHog)이 모두 코드에 반영됐다. 남은 건 커스텀 이벤트 스펙 정의, Session Replay 마스킹,
> 동의 배너 등 제품/정책 결정이 필요한 항목들이다 — 각 절의 체크리스트에서 `[ ]`로 남아있는
> 항목 참고. 실제로 무엇이 수집되는지는 [`docs/posthog-logging-reference.md`](./posthog-logging-reference.md)에
> 별도 정리했다. 아래 "현재 상태 확인"/"v2 레포 확인 결과"는 작업 착수 전 조사 기록이라 원문
> 그대로 남겨둔다.

## 현재 상태 확인

- **에러 처리**: `RootErrorBoundary`(`src/components/@common/RootErrorBoundary/RootErrorBoundary.tsx`)가
  TanStack Router의 `defaultErrorComponent`로 등록돼 있지만, 에러를 어딘가에 **보고하지 않고**
  단순히 이전 경로로 이동 + `ErrorModalProvider`로 모달만 띄운다. 에러 트래킹 도구가 붙을 지점이
  이미 존재한다.
- **분석 도구**: 코드베이스 어디에도 GA/PostHog/Mixpanel 등 분석 SDK 호출이 없다. `autocapture`나
  페이지뷰 트래킹이 전무한 상태.
- **환경변수**: `.env.production`에 다음 키가 **주석 처리된 채로 이미 스캐폴딩**돼 있다 — 과거에
  도입을 시도했다가 보류된 흔적으로 보인다.
  ```
  # VITE_SENTRY_DSN=...
  # VITE_MIXPANEL_TOKEN=...
  # VITE_CLARITY_PROJECT_ID=...
  ```
  `VITE_GOOGLE_TAG_ID`는 `.env.development`/`.env.production` 양쪽에 값이 들어 있지만 코드에서
  참조하는 곳이 없다(죽은 설정 또는 별도 배포 파이프라인에서 주입되는 값으로 추정 — 확인 필요).
- **배포 환경변수 주입 방식**: 리포지토리 내에 Vercel/Netlify 등 배포 설정 파일이 없어, CI/CD에서
  환경변수(DSN, API Key)를 어떻게 주입하는지 리포 밖(배포 플랫폼 설정)에서 확인해야 한다.
- **CI**: `.github/workflows/ci.yml`은 타입 체크 + Biome 린트만 수행. 소스맵 업로드 등 배포 단계
  워크플로우는 별도로 없음. 리포 안에 `buildspec.yml` 등 배포 설정 파일도 없음 — 아래 "v2 레포
  확인 결과"에서 실제 배포 방식을 확인함.
- **[2026-09-23 추가] 게스트뷰(브라우저) vs 호스트뷰(RN 웹뷰) 이원 구조**: 이 레포는 게스트(방문객)
  화면은 일반 브라우저로, 호스트(작가) 화면은 RN 앱 `forgather-frontend-app`이 웹뷰로 감싸서
  보여준다. `src/utils/isAppWebview.ts`(`User-Agent`에 `APP_WEBVIEW_USER_AGENT` 포함 여부로 판별)로
  두 컨텍스트를 이미 구분하고 있고, `src/utils/nativeBridge.ts`로 RN 쪽에 로그아웃 등을 알리는
  Web→RN postMessage 브릿지도 있음. Sentry/PostHog 도입 시 이 구분을 그대로 활용해 환경 태깅(예:
  `webview` vs `browser`)을 해야 하고, RN 앱(`forgather-frontend-app`) 쪽에 이미 자체 크래시
  리포팅/분석 SDK가 붙어 있는지 확인해 중복 수집이나 세션 경계 혼선이 없는지 맞춰봐야 함(별도
  레포라 이 대화에서는 확인 불가 — RN 쪽 담당자/레포 확인 필요).

## 참고: `forgather-frontend-web`(v2) `frontend/`의 Sentry 구현 확인 결과

같은 조직의 이전 버전 레포(`forgather-frontend-web/frontend`)에 Sentry가 이미 운영 중이라
그 구현을 확인했다. **PostHog는 v2에도 없음** — 대신 Mixpanel + GA4(`react-ga4`) +
Microsoft Clarity 조합을 쓰고 있어서, PostHog 도입은 이 조직에 참고할 선례가 없는
새로운 시도다(분석 도구 다중화 대신 PostHog로 통합할지도 팀과 논의 필요).

v2의 Sentry 구현 핵심 패턴:

- **초기화** (`src/main.tsx`): 별도 dev DSN을 두지 않고, `VITE_ENVIRONMENT === 'production'`
  조건 블록 안에서만 `Sentry.init()`(+ Clarity/Mixpanel/GA4 초기화)을 호출. `sendDefaultPii: true`
  옵션을 켜고 있음 — IP, 쿠키 등 기본 PII를 그대로 전송한다는 뜻이라, 방명록 서비스인 v3에서는
  그대로 가져갈지 신중히 결정해야 함(사용자 콘텐츠·개인정보 노출 리스크).
- **React 렌더 에러 캡처 없음**: `Sentry.ErrorBoundary`나 자체 ErrorBoundary에서
  `captureException`을 호출하는 코드가 전혀 없음. Sentry 캡처가 **API 계층에만** 몰려 있어서,
  컴포넌트 렌더링 중 발생하는 에러는 Sentry에 잡히지 않는 사각지대다. v3는 이미
  `RootErrorBoundary`(`src/components/@common/RootErrorBoundary/RootErrorBoundary.tsx`)가
  라우터 레벨에 있으니, 여기서 캡처를 추가하면 v2보다 커버리지를 넓힐 수 있음.
- **API 계층 캡처 패턴** (`src/apis/http.ts`, `src/apis/refresh.ts`,
  `src/utils/captureSentryError.ts`): 공통 fetch 래퍼의 401 재시도 실패, `!response.ok`,
  네트워크 예외 세 지점에서 `captureSentryError()`라는 자체 유틸을 호출. 이 유틸이
  `errorType`(`'network_error' | 'http_error' | 'auth_retry_failed'`), `statusCode`, `traceId`를
  `tags`로, request/response 컨텍스트(`url`, `method`, body 앞 500자, `navigator.onLine`,
  `user_agent` 등)를 `extra`/`contexts`로 태깅해서 `Sentry.captureException`에 전달. 4xx는
  `level: 'warning'`, 5xx는 `'error'`로 구분. 토큰 갱신 실패(`refresh.ts`)는
  `'token_refresh_failed'`/`'token_refresh_max_retry_exceeded'` 태그로 별도 캡처.
  → v3는 axios 인터셉터(`src/api/apiClient.ts`)가 이 역할을 대신할 위치. 이미
  `apiClient.interceptors.response.use`의 에러 핸들러에
  `// TODO: 서버 에러 응답 구조 확정 후 아래 항목 구현 필요`라는 주석이 있어, Sentry 캡처를
  끼워 넣기에 정확히 맞는 지점.
- **소스맵 업로드** (`vite.config.ts`): 별도 CI 스텝이 아니라 `@sentry/vite-plugin`을
  `isProduction`(`process.env.VITE_ENVIRONMENT === 'production'`) 조건으로 vite 플러그인
  목록에 직접 추가하고, `build.sourcemap: true`를 전역 설정. `org`/`project`/`authToken`은
  `process.env.VITE_SENTRY_ORG` / `VITE_SENTRY_PROJECT` / `VITE_SENTRY_AUTH_TOKEN`에서
  읽는데, 이 값들은 `.env.production` 파일에는 **없음** — 시크릿(특히 authToken)이라 커밋되지
  않고 빌드 환경 변수로 주입되는 것으로 보임.
- **배포 파이프라인**: v2는 `frontend/buildspec.yml`(AWS CodeBuild, `npm run build:prod` →
  `frontend/dist` 아티팩트)로 배포되고, 저장소 안에 Vercel/Netlify 설정은 없음. v3에는
  아직 `buildspec.yml`이 없으므로, 실제 배포가 v2와 같은 AWS CodeBuild 파이프라인을 쓰는지,
  아니면 아직 구축 전인지 확인이 필요 — `VITE_SENTRY_AUTH_TOKEN` 등 시크릿을 어디(CodeBuild
  환경 변수, Parameter Store 등)에 넣을지가 여기에 달려 있음.

## 사전 결정 필요 사항 (진행 전 확인)

> **[2026-09-24 업데이트]** 아래 표는 실제 결정된 값으로 갱신했다. 실제 구현 내용은
> "Sentry 작업"/"PostHog 작업" 절과 [`docs/posthog-logging-reference.md`](./posthog-logging-reference.md)를 참고.

| 항목 | 확인할 내용 | 결정 |
|---|---|---|
| PostHog 호스팅 | Cloud(US/EU) vs Self-hosted, 프로젝트/조직 소유자 | **결정됨** — US Cloud, project token 발급받아 사용 중 |
| Session Replay | PostHog Session Replay 활성화 여부 | **결정됨** — 켜는 방향. 단 코드에 `maskAllInputs` 등 마스킹 설정은 아직 없음(아래 PostHog 작업 참고) — PostHog 프로젝트 설정에서 Session Replay 기능 자체를 켜야 실제로 녹화 시작됨(코드 밖 대시보드 설정) |
| Feature Flag | PostHog Feature Flag를 지금 도입할지 | **미정** — 이번 작업 범위에 포함하지 않음, 분석 전용으로 시작 |
| Sentry 플랜 | 조직/프로젝트 생성 권한, Sentry 팀 소유자 | **결정됨** — org `forgather-wh`, project `forgather` (v2와 별도) |
| `sendDefaultPii` | v2는 `true` | **결정됨** — v3도 `true`로 v2와 동일하게 적용 |
| Performance/Session Replay(Sentry) | 에러 트래킹만 할지, Tracing/Replay까지 포함할지 | **미정** — 이번엔 에러 트래킹 + 소스맵 업로드까지만 구현, Tracing/Replay는 미도입 |
| 동의 배너(GDPR/개인정보) | PII 마스킹·수집 동의 UI 필요 여부 | **미정** — 이번 작업 범위에 포함하지 않음 |
| 환경 분리 | dev/production 환경 분리 | **결정됨** — v2와 동일하게 production에서만 SDK 초기화, dev는 비활성 |
| 배포 파이프라인 | 실제 배포 방식 확인 | **확인됨** — AWS CodeBuild 아님. 로컬에서 `npm run build` 후 수동으로 S3 업로드하는 방식. 즉 `SENTRY_AUTH_TOKEN` 같은 시크릿은 CI 시크릿이 아니라 빌드를 실행하는 로컬 머신의 `.env.production`(gitignore 대상)에 넣으면 됨. 로컬에서 배포하는 팀원이 여러 명이면 각자 이 파일에 값을 넣어야 함 |
| 웹뷰(호스트) ↔ RN 앱 중복 수집 | RN 앱 쪽 SDK와의 중복 여부 | **미확인** — RN 레포 확인은 여전히 필요. 우리 쪽은 `view_context: "host_webview" \| "guest_browser"` 태깅으로 최소한의 구분 장치만 마련해둠 |

## 공통 준비 작업

- [x] PostHog 프로젝트 생성 → API Key, Host URL(`VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`) 발급
- [x] Sentry 프로젝트 생성(React 플랫폼) → DSN 발급, 기존 `.env.production`의 주석 처리된
      `VITE_SENTRY_DSN` 재사용
- [x] `.env.production`에 신규 키 추가 — `VITE_SENTRY_DSN`, `VITE_POSTHOG_KEY`,
      `VITE_POSTHOG_HOST`, `SENTRY_AUTH_TOKEN`(소스맵 업로드용, `VITE_` 접두사 없음 — 클라이언트
      번들 노출 방지). `.env.development`는 그대로 둠(SDK가 production에서만 초기화되므로 불필요)
- [ ] `.env.example` — 이번 작업에서는 만들지 않음(레포에 원래 `.env.example` 관례 자체가 없고,
      모든 `.env.*` 파일이 gitignore 대상이라 팀 전체가 쓰는 공유 템플릿이 없는 상태). 필요하면
      별도로 논의
- [x] 배포 파이프라인 확인 — CI/CD가 아니라 로컬 수동 빌드+S3 업로드 방식이라, "CI 시크릿 등록"
      대신 로컬 `.env.production`에 값을 넣는 것으로 대체됨

## Sentry 작업

> **[2026-09-24] 구현 완료.** 아래 체크리스트는 실제 반영 결과로 갱신했다. 코드는
> `src/utils/sentry.ts`(초기화/식별), `src/utils/captureSentryError.ts`(axios 에러 변환),
> `src/api/apiClient.ts`(인터셉터 연동), `src/components/@common/RootErrorBoundary/RootErrorBoundary.tsx`,
> `src/routes/_appOnly/_authenticated.tsx`, `vite.config.ts`에 있다.

- [x] `@sentry/react`, `@sentry/vite-plugin` 설치 (이미 `package.json`에 있던 상태를 그대로 사용)
- [x] `src/utils/sentry.ts`에서 `Sentry.init()` 구성
  - `dsn`(`VITE_SENTRY_DSN`), `environment`(`VITE_ENVIRONMENT`) 설정
  - v2와 동일하게 `VITE_ENVIRONMENT === "production"` 조건으로 감싸 dev에서는 아예 초기화하지
    않음(별도 dev 프로젝트는 만들지 않음)
  - `sendDefaultPii: true` — v2와 동일하게 결정
  - `release` 설정은 이번 범위에서 제외(추후 필요 시 검토)
- [x] `RootErrorBoundary`에 `Sentry.captureException(error)` 연동 완료 — 렌더링 중 에러가
      더 이상 아무데도 보고되지 않고 사라지지 않음
- [x] 전역 `window.onerror`/`unhandledrejection`은 `Sentry.init`의 기본 통합(GlobalHandlers)이
      자동으로 캡처 — 별도 코드 불필요, 그대로 둠
- [x] API 에러 캡처: `apiClient.ts` 인터셉터의 4개 분기(`network_error`/`http_error`/
      `auth_retry_failed`/`token_refresh_failed`)에서 `captureSentryError()` 호출
  - `errorType`, `statusCode`, 응답의 `code`(`docs/api-error-codes-reference.md` 기준)를
    `tags`로, **요청 payload 전체 + 응답 body 전체**를 `extra.requestBody`/`extra.responseBody`로
    전송(사용자 요청으로 범위를 넓힘 — 방명록 콘텐츠 등 사용자 입력값이 그대로 Sentry
    대시보드에 노출될 수 있다는 트레이드오프 있음)
  - 요청 body가 `FormData`(이미지 업로드)면 `File`은 파일명 문자열로 치환해 직렬화
  - 4xx는 `warning`, 5xx/네트워크 에러는 `error` 레벨로 구분
  - 404는 `notFound()` 마커로 라우터가 전담하는 정상 플로우라 캡처 대상에서 제외(삭제된
    방명록 링크 접근 등으로 노이즈가 쌓이지 않도록)
  - `/auth/refresh` 실패는 인터셉터 상단 분기에서 1회만 캡처하도록 정리 — 동시 요청이
    `refreshPromise`를 공유하는 구조라, 재시도 로직의 catch에서 또 캡처하면 실패 1건이
    대기 중이던 요청 수만큼 중복 리포팅되는 문제가 있어 제거함
  - v3에는 v2의 `trace-id` 헤더 같은 요청 추적 ID가 없어 생략함
- [x] 소스맵 업로드: `vite.config.ts`에 `@sentry/vite-plugin`을 production 빌드 조건부로 추가,
      `build.sourcemap: true` 전역 설정. `org: "forgather-wh"`, `project: "forgather"`는 시크릿이
      아니라 코드에 직접 명시. `authToken`은 `SENTRY_AUTH_TOKEN`(`VITE_` 접두사 없음 — 붙이면
      Vite가 클라이언트 번들에 노출시킴)이라는 이름으로 로컬 `.env.production`에 저장하고
      `loadEnv`로 읽어 전달. 실제 빌드로 소스맵 업로드 성공 + 번들에 토큰 미노출까지 확인함
- [x] 로그인 사용자 식별: `_authenticated.tsx`에서 `useGetCurrentUser` 성공 시 `hostId`로
      `identifySentryUser()`(`Sentry.setUser({ id: String(hostId) })`) 호출, 로그아웃 시
      `clearSentryUser()`(`Sentry.setUser(null)`) 호출
- [ ] Performance/Tracing, Session Replay(Sentry 쪽)는 이번 범위에서 제외 — 필요해지면 별도로
      결정(번들 크기·Lighthouse 90점 기준과 트레이드오프 있음)
- [x] `view_context: "host_webview" | "guest_browser"` 태깅 완료(`isAppWebview` 기반).
      RN 앱 쪽 크래시 리포팅과의 중복 여부는 여전히 미확인 — RN 레포 쪽 확인 필요

## PostHog 작업

> **[2026-09-24] 구현 완료.** 코드는 `src/utils/analytics.ts`(초기화/식별/pageview),
> `src/routes/__root.tsx`(pageview 캡처), `src/routes/_appOnly/_authenticated.tsx`(식별),
> `src/api/apiClient.ts`(로그아웃 시 reset)에 있다. 실제로 무엇이 수집되는지는
> [`docs/posthog-logging-reference.md`](./posthog-logging-reference.md)에 별도로 정리했다.

- [x] `posthog-js` 설치 (이미 `package.json`에 있던 상태를 그대로 사용)
- [x] `src/utils/analytics.ts`에서 `posthog.init()` 구성
  - `api_host`(`VITE_POSTHOG_HOST`), `VITE_POSTHOG_KEY` 적용
  - `autocapture`/`Session Replay`는 켜는 방향으로 결정 — 단, 코드에서 `autocapture: false`로
    끄지 않았을 뿐 명시적으로 켠 것도 아니라 posthog-js **기본값**을 그대로 쓰는 상태.
    Session Replay는 PostHog 프로젝트 설정에서 별도로 활성화해야 실제 녹화가 시작됨(코드
    밖 영역) — 아직 안 켰다면 대시보드에서 켜야 함
  - v2와 동일하게 production에서만 초기화, dev는 비활성화(별도 dev 프로젝트는 안 만듦)
- [x] TanStack Router 페이지뷰 수동 캡처 — `__root.tsx`에서 pathname 변경 시
      `capturePageview()` → `posthog.capture("$pageview", { $current_url })` 호출
      (`capture_pageview: false`로 자동 캡처는 꺼둠)
- [x] 공통 유틸 작성 — `src/utils/analytics.ts`에 `initAnalytics`/`capturePageview`/
      `identifyAnalyticsUser`/`resetAnalyticsUser`로 정리(컴포넌트에서 `posthog.capture()`를
      직접 호출하지 않음)
- [x] 로그인 사용자 식별: `_authenticated.tsx`에서 `hostId`로 `identifyAnalyticsUser()`
      (`posthog.identify(String(hostId))`), 로그아웃 시 `resetAnalyticsUser()`(`posthog.reset()`)
- [ ] 트래킹할 핵심 이벤트 목록(방명록 작성 완료, 전시 생성, 공유 링크 복사 등)은 **아직 정의
      안 함** — 기획/PM과 이벤트 스펙 합의 후 별도로 추가 필요
- [ ] Session Replay 마스킹(`maskAllInputs` 등)은 **아직 설정 안 함** — Session Replay를 대시보드에서
      켜면 방명록 텍스트 등 사용자 콘텐츠가 마스킹 없이 그대로 녹화될 수 있음. 켜기 전에
      마스킹 설정부터 하는 걸 권장
- [x] 웹뷰/브라우저 구분: `posthog.register({ view_context: "host_webview" | "guest_browser" })`로
      모든 이벤트에 공통 속성 태깅. 단, 같은 프로젝트/대시보드를 그대로 쓰는 구조라 별도
      프로젝트 분리는 하지 않음

## 공통 마무리 작업

- [x] 두 SDK 초기화 코드를 `src/lib/`이 아니라 프로젝트에 이미 있던 관례에 맞춰 `src/utils/`
      하위에 분리(`analytics.ts`, `sentry.ts`, `captureSentryError.ts`) — 이 레포에는 `src/lib/`
      폴더 자체가 없어서 기존 `src/utils/` 플랫 구조를 그대로 따름
- [x] TypeScript strict 모드 기준 타입 에러 없음 확인 (`npx tsc -b`)
- [x] Biome 린트 통과 확인 (`npx @biomejs/biome check .`)
- [ ] 번들 크기 영향 측정/지연 로딩 검토 — 아직 안 함. 참고로 `sentry` 청크가 gzip 기준
      약 130KB로 별도 청크로 분리돼 있음(`dist/assets/sentry-*.js`)
- [x] 유틸리티 테스트 작성 — `analytics.test.ts`/`sentry.test.ts`/`captureSentryError.test.ts`
      추가(CLAUDE.md의 "유틸리티 함수 100%" 커버리지 기준에 맞춤). 단, 실제 PostHog/Sentry
      대시보드에 이벤트가 찍히는지는 프로덕션 배포 후 직접 확인 필요(로컬 dev에서는 SDK가
      아예 초기화되지 않으므로 로컬 확인 불가)
- [ ] 의도적으로 에러를 발생시켜 Sentry 대시보드에 실제로 수집되는지 확인 — 프로덕션 배포 후
      확인 필요(로컬에서는 초기화 자체가 안 됨)
- [ ] Lighthouse Performance/Accessibility 재측정 — 아직 안 함
- [ ] `CLAUDE.md` 또는 컨벤션 문서에 사용법 추가 여부 — 아직 결정 안 함
