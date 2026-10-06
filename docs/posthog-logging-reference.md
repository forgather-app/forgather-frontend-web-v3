# PostHog 로깅 항목 레퍼런스

`src/utils/analytics.ts` / `src/routes/__root.tsx` / `src/routes/_appOnly/_authenticated.tsx` /
`src/api/apiClient.ts` 구현 기준으로, PostHog에 실제로 어떤 데이터가 전송되는지 정리한다.

## 초기화 조건

- `posthog.init()`은 `VITE_ENVIRONMENT === "production"`일 때만 호출된다(`src/main.tsx`에서
  앱 부팅 시 1회). dev/local에서는 아예 초기화되지 않으므로 이 문서의 어떤 항목도 dev
  환경에서는 전송되지 않는다.
- `api_host`는 `VITE_POSTHOG_HOST`(US Cloud: `https://us.i.posthog.com`)를 사용한다.

## 자동으로 수집되는 것

`posthog.init()`에 `autocapture`나 `session_recording`을 명시적으로 끄지 않았으므로,
posthog-js 기본값(둘 다 활성화) 그대로 동작한다. 즉 **코드에는 없지만 SDK 기본 동작으로
전송되는 이벤트**가 있다.

- **`$autocapture`**: 페이지의 클릭, input 변경, form 제출 등 상호작용 이벤트. 요소의 텍스트,
  클래스, DOM 경로 등이 함께 담긴다. 비밀번호 필드는 기본적으로 마스킹되지만, 방명록 내용
  등 일반 텍스트 input의 값은 기본 설정상 노출될 수 있다.
- **`$pageleave`**: 사용자가 페이지(탭)를 떠날 때.
- **`$rageclick`**: 같은 영역을 짧은 시간에 반복 클릭하는 패턴 감지.
- **Session Replay(화면 녹화)**: PostHog 프로젝트 설정에서 "Session replay"가 켜져 있어야
  실제로 녹화가 시작된다(코드가 아닌 대시보드 토글). 현재 코드에는 `maskAllInputs` 등
  **마스킹 설정이 되어 있지 않다** — 켤 경우 화면에 보이는 방명록 텍스트, 이미지 등이
  그대로 녹화될 수 있다는 점을 감안해야 한다.

## 코드에서 명시적으로 전송하는 것

| 시점 | 이벤트/API | 내용 | 위치 |
| --- | --- | --- | --- |
| 라우트 이동마다 | `$pageview` | `$current_url`(현재 pathname) | `src/routes/__root.tsx` |
| 로그인 확인(`useGetCurrentUser`) 성공 시 | `posthog.identify(String(hostId))` | 호스트 ID를 문자열로 변환한 값을 `distinct_id`로 사용 | `src/routes/_appOnly/_authenticated.tsx` |
| 로그아웃 시 | `posthog.reset()` | 다음 세션이 이전 사용자와 섞이지 않도록 `distinct_id` 초기화(익명 ID로 복귀) | `src/api/apiClient.ts`(`forceLogoutAndRedirect`) |

## 모든 이벤트에 공통으로 붙는 속성

`posthog.register()`로 등록한 superProperty가 이후 전송되는 모든 이벤트(자동 캡처 포함)에
함께 실린다.

- `view_context`: `"host_webview"`(RN 앱 웹뷰로 접속) 또는 `"guest_browser"`(일반 브라우저).
  `isAppWebview(navigator.userAgent)`로 판별.

## PostHog가 수집하지 않는 것

- **에러/예외**: PostHog에는 별도의 에러 캡처 코드가 없다. JS 에러·API 에러는 전부
  Sentry(`src/utils/sentry.ts`, `src/utils/captureSentryError.ts`)가 담당한다.
- **방명록 작성 완료, 전시 생성, 공유 링크 복사** 등 도메인 이벤트: 아직 정의되지 않았다.
  기획/PM과 이벤트 스펙을 합의한 뒤 별도로 추가해야 한다
  (`docs/posthog-sentry-integration-plan.md`의 "PostHog 작업" 항목 참고).

## distinct_id 흐름

1. 앱 최초 방문 시 posthog-js가 익명 랜덤 ID를 로컬에 생성해 사용.
2. `_authenticated` 레이아웃에서 `useGetCurrentUser`가 성공하면 해당 호스트 ID로
   `identify()`가 호출되어 이후 이벤트가 그 호스트 계정에 귀속됨(과거 익명 이벤트와
   PostHog가 자동으로 병합을 시도함).
3. 로그아웃 시 `reset()`이 호출되어 새 익명 ID로 돌아감 — 같은 브라우저를 다른 사람이
   이어서 써도 이전 사용자의 이벤트와 섞이지 않음.

게스트(방문객) 화면은 로그인 플로우 자체가 없으므로, 게스트 트래픽은 계속 익명 ID로만
남는다.
