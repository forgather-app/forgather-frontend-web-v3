# v3 경로 분리(base path) 철거 가이드

## 배경

- `forgather.app`에는 현재 구 레포(`forgather-frontend-web`, v2)가 루트(`/`)로 배포되어 있다.
- 신 레포(`forgather-frontend-web-v3`)는 같은 도메인 아래 `/v3` 경로 prefix로 나란히 배포되어,
  v2 → v3 전환 기간 동안 두 버전이 공존한다. (관련 PR: #260, 이슈 #259)
- v2 트래픽이 완전히 걷히고 v3가 루트(`/`)를 차지하게 되면, 이 문서에 정리된 `/v3` prefix
  관련 코드를 모두 되돌려야 한다.

### 전제 조건 (착수 전 확인)

- [ ] v2 배포가 완전히 내려갔거나, v2 → v3 트래픽 전환이 끝났다.
- [ ] 인프라(S3/CDN 등) 라우팅이 `forgather.app/*` → v3 산출물 루트로 바로 서빙하도록 변경 준비가 되어 있다.
- [ ] `.well-known/*`(Apple/Android 앱링크 검증 파일)이 여전히 도메인 루트에서 서빙되는지 별도 확인.

---

## 되돌려야 할 변경 목록

### 1. `vite.config.ts` — `base` 옵션 제거

```diff
 export default defineConfig({
-  // NOTE: src/constants/routes.ts의 APP_BASE_PATH와 값을 반드시 맞춰야 한다
-  // (forgather.app을 v2/v3가 경로로 나눠 쓰기 위한 prefix)
-  base: "/v3/",
   plugins: [
```

`base`를 제거하면(또는 `/`로 되돌리면) 기본값 `/`로 정적 자산 경로가 생성된다.

### 2. [src/constants/routes.ts](../src/constants/routes.ts) — `APP_BASE_PATH` 제거

```diff
-// NOTE: forgather.app을 v2/v3가 경로로 나눠 쓰기 위한 prefix. vite.config.ts의
-// base 설정과 값을 반드시 맞춰야 한다 (하나만 바뀌면 정적 자산 경로가 깨짐).
-export const APP_BASE_PATH = "/v3";
-
-export const CURRENT_SPACE_FALLBACK_IMAGE = `${APP_BASE_PATH}/images/fallback/current_space.png`;
-export const EXHIBITION_LIST_FALLBACK_IMAGE = `${APP_BASE_PATH}/images/fallback/exhibition_list.png`;
+export const CURRENT_SPACE_FALLBACK_IMAGE = "/images/fallback/current_space.png";
+export const EXHIBITION_LIST_FALLBACK_IMAGE = "/images/fallback/exhibition_list.png";
```

`APP_BASE_PATH`를 참조하는 아래 사용처도 함께 정리한다 (import 제거 + 문자열 리터럴로 단순화,
또는 라우팅 구조상 필요 없어지면 완전히 삭제).

| 파일 | 용도 |
| --- | --- |
| [src/App.tsx](../src/App.tsx) | `createRouter({ basepath: APP_BASE_PATH })` — TanStack Router의 basepath 설정. 제거 시 router가 `/`부터 매칭 |
| [src/api/apiClient.ts](../src/api/apiClient.ts) | 401 응답 시 로그인 페이지 리다이렉트 URL (`${APP_BASE_PATH}/login?...`) |
| [src/components/UI/SpaceFileCard/SpaceFileCard.tsx](../src/components/UI/SpaceFileCard/SpaceFileCard.tsx) | 이미지 fallback 경로 |
| [src/pages/home/components/currentSpaceSection/CurrentSpaceSection.tsx](../src/pages/home/components/currentSpaceSection/CurrentSpaceSection.tsx) | 이미지 fallback 경로 |
| [src/routes/_appOnly/_authenticated/spaces/$spaceId.tsx](../src/routes/_appOnly/_authenticated/spaces/$spaceId.tsx) | 방명록 공유 URL 생성 시 prefix |

### 3. [scripts/prepare-deployment-v3.js](../scripts/prepare-deployment-v3.js) — 스크립트 삭제

`dist/` 산출물을 `.well-known`은 루트에 남기고 나머지를 `dist/v3/`로 옮기는 배포 전용
스크립트다. v3가 루트를 차지하면 이 재구성 자체가 불필요해지므로 파일을 삭제한다.

### 4. [package.json](../package.json) — 빌드 스크립트 원복

```diff
-    "build:development": "tsc -b && vite build --mode development",
-    "build:deployment-v3": "tsc -b && vite build && node scripts/prepare-deployment-v3.js",
-    "build:deployment-v3:development": "tsc -b && vite build && node scripts/prepare-deployment-v3.js",
```

`build:development`는 `--mode development` 자체는 v3 분리와 무관하므로 필요하면 유지해도 되고,
`build:deployment-v3` 계열(재구성 스크립트를 호출하는 것)만 제거하면 된다. 배포 파이프라인에서
이 스크립트를 호출하는 CI/CD 설정도 함께 `build`(또는 `build:development`)로 되돌린다.

---

## 정리 후 확인 사항

1. `npm run build` 산출물의 `index.html` 내 자산 경로가 `/v3/assets/...`가 아니라 `/assets/...`로
   생성되는지 확인.
2. 로그인 리다이렉트, 방명록 공유 URL, 이미지 fallback 등 위 표의 사용처가 모두 `/`
   기준 절대경로로 정상 동작하는지 QA.
3. `.well-known/*` 서빙 경로(Universal Link/App Link 검증)에 영향이 없는지 확인 — 이 파일들은
   v2/v3 분리와 무관하게 원래도 도메인 루트에서만 서빙되어야 한다.
4. 배포 인프라(S3/CDN 라우팅, CI 빌드 커맨드)에서 `/v3` 관련 라우팅 규칙 제거.
5. 이 문서와 `docs/domain-migration-legacy-url-handling.md`(레거시 URL 리다이렉션) 중 더 이상
   유효하지 않은 내용이 있으면 함께 정리하거나 삭제.
