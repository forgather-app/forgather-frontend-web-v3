# API 연동 컨벤션

Orval로 생성된 API 훅(`src/api/generated/*.ts`)을 컴포넌트/페이지에서 연동할 때 반드시 준수해야 하는 규칙입니다.
API 연동 작업을 하는 모든 작업에서 이 파일을 참조합니다.

---

## 1. 기본 원칙

- `src/api/generated.ts`, `src/api/generated/*.ts`, `src/api/model/`은 Orval이 자동 생성합니다. **직접 수정 금지** — 스펙 변경이 필요하면 `npx orval` 재실행으로 반영합니다.
- 조회(GET)는 생성된 `useSuspenseQuery` 기반 훅을 그대로 사용합니다.
  - 예외: OpenAPI 스펙이 실제 서버 동작(쿼리 파라미터 등)을 누락해 생성된 훅으로 표현이 불가능한 경우, `customFetcher`를 직접 호출하는 커스텀 쿼리로 대체할 수 있습니다. 이 경우 코드에 스펙 누락 사실과 실제 동작 근거를 주석으로 남깁니다 — [`GuestBookPage.tsx`](../../src/pages/guestBook/GuestBookPage.tsx)의 페이지네이션 처리(page/size 쿼리 파라미터 미문서화) 참고.
- 생성/수정/삭제 등 부수효과가 있는 요청은 생성된 `useMutation` 기반 훅(`useXxx`)을 사용합니다.
- 인증 토큰 첨부(`Authorization` 헤더)는 `src/api/apiClient.ts`의 요청 인터셉터가 전역으로 처리합니다. 컴포넌트에서 토큰을 직접 다루지 않습니다.
- 서버 공통 에러 처리(401 재발급, 403 등)는 `apiClient.ts`의 응답 인터셉터에 아직 구현되어 있지 않습니다(TODO). 그 전까지는 **각 mutation 호출부에서 `onError`로 개별 처리**합니다.

---

## 2. Mutation 연동 패턴

`useMutation` 기반 훅은 컴포넌트에서 아래 형태로 호출합니다. `mutate`의 `onSuccess`/`onError` 콜백에서 네비게이션과 에러 노출을 처리합니다.

```typescript
import { useNavigate } from "@tanstack/react-router";
import { useXxxAction } from "@/api/generated/xxx";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";

const Component = () => {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { mutate: xxxAction, isPending } = useXxxAction();

  const handleSubmit = () => {
    xxxAction(
      { data: requestBody }, // 요청 바디가 없는 mutation은 undefined
      {
        onSuccess: () => {
          navigate({ to: "/next-path" });
        },
        onError: () => {
          showSnackBar(ERROR_MESSAGES.XXX_FAILED, "error");
        },
      },
    );
  };

  return <button disabled={isPending} onClick={handleSubmit}>확인</button>;
};
```

- 요청 바디(variables)가 없는 mutation(`TVariables = void`)은 `mutate(undefined, { onSuccess, onError })` 형태로 호출합니다.
- 중복 요청 방지가 필요한 경우 `useState`/`useRef`로 요청 여부를 추적합니다 — [`useKakaoLoginBridge.ts`](../../src/hooks/@common/useKakaoLoginBridge.ts) 참고.
- 버튼 등 트리거 요소는 `isPending`일 때 `disabled` 처리해 중복 클릭을 막습니다.

---

## 3. 에러 처리 패턴

- 사용자에게 노출할 에러 메시지는 하드코딩하지 않고 `src/constants/error.ts`의 `ERROR_MESSAGES`에 상수로 추가합니다.

```typescript
// src/constants/error.ts
export const ERROR_MESSAGES = {
  LOGIN_FAILED: "로그인에 실패했습니다",
  XXX_FAILED: "OOO에 실패했습니다",
} as const;
```

- 에러 노출은 `src/hooks/@common/useSnackBar.ts`의 `showSnackBar(message, iconType)`를 사용합니다. `iconType`은 `"alert"`(성공/안내) 또는 `"error"`(실패)입니다.
- `onError`에서는 스낵바 노출만 담당하고, 실패 시 화면 이동이 필요하면(예: 로그인 실패 후 로그인 페이지로 복귀) 함께 `navigate`를 호출합니다.
- 공통 에러 인터셉터(401 재발급 등)가 도입되기 전까지, 개별 mutation의 `onError`가 유일한 에러 처리 지점입니다. 빠뜨리지 않도록 주의합니다.

---

## 4. 네비게이션 패턴

- 페이지 이동은 TanStack Router의 `useNavigate()`를 사용합니다.

```typescript
const navigate = useNavigate();
navigate({ to: "/" });
```

- API 성공/실패에 따른 이동은 mutation의 `onSuccess`/`onError` 콜백 내부에서 처리하고, 컴포넌트 바디에 별도의 `useEffect`로 분리하지 않습니다.

---

## 5. 참고 구현

- [`useKakaoLoginBridge.ts`](../../src/hooks/@common/useKakaoLoginBridge.ts) — mutation 호출 + 성공/실패 분기 + 스낵바 + 네비게이션의 기본형
- [`TermsStep.tsx`](../../src/pages/signUp/steps/TermsStep.tsx) — 퍼널 내부 단계에서 mutation 성공 시에만 다음 단계로 진행하는 패턴
