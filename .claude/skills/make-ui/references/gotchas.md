# Gotchas — 알려진 함정 패턴

이 파일은 `make-ui` 스킬 실행 시작 전 1회 읽습니다.
구현 중 해당 상황이 발생하면 아래 내용을 기준으로 처리합니다.

---

## G1. Figma nodeId 변환 오류

URL의 `node-id` 파라미터는 `-` 구분자를 사용하지만, MCP는 `:` 구분자를 요구합니다.
변환하지 않으면 MCP가 노드를 찾지 못하고 빈 결과를 반환합니다.

```
URL:  ?node-id=1234-5678
MCP:  nodeId = "1234:5678"  ← 반드시 변환
```

---

## G2. theme 중첩 구조

이 프로젝트의 theme은 중첩 객체입니다. flat하게 접근하면 `undefined`가 됩니다.

```typescript
// ❌ undefined 반환
theme.colors.purple
theme.colors.white

// ✅ 올바른 접근
theme.colors.main.purple       // "#6247FF"
theme.colors.main.purple50     // "#8974FF"
theme.colors.gray.white        // "#FFFFFF"
theme.colors.gray.gray500      // "#414855"
theme.colors.semantic.alertRed // "#FF4B4B"
theme.typography.body1         // { fontWeight, fontSize, ... }
```

전체 토큰 목록은 `src/styles/theme.ts` 참조.

---

## G3. Storybook ThemeProvider 미설정

`.storybook/preview.ts`에 ThemeProvider 전역 데코레이터가 없으면 Storybook에서 `theme`이 `undefined`가 됩니다.
각 스토리나 컴포넌트에 개별적으로 감쌀 필요 없이 `preview.ts`에 한 번만 추가하면 됩니다.

```typescript
// .storybook/preview.ts
import { ThemeProvider } from "@emotion/react";
import { theme } from "../src/styles/theme";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: { /* 기존 설정 유지 */ },
};

export default preview;
```

Storybook 스토리 작성 전 이 설정이 있는지 확인합니다. 없으면 추가하거나 사용자에게 안내합니다.

---

## G4. EmotionTheme 타입 선언 누락

`src/types/emotion.d.ts`에 module augmentation이 없으면 styled component 내 `theme` 접근 시 TypeScript 오류가 발생합니다.

```typescript
// src/types/emotion.d.ts
import "@emotion/react";
import { theme } from "../styles/theme";

type AppTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
```

`src/types/` 디렉토리를 먼저 확인하고, 파일이 없으면 생성을 제안합니다.

---

## G5. useSuspenseQuery + Suspense 경계 누락 (페이지 전용)

Orval 기본 설정이 `useSuspenseQuery`이므로 데이터 페칭 컴포넌트의 부모에 반드시 `<Suspense>` + `<ErrorBoundary>`가 필요합니다.
없으면 런타임 에러가 발생합니다.

```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <Suspense fallback={<LoadingSpinner />}>
    <DataFetchingComponent />
  </Suspense>
</ErrorBoundary>
```

---

## G6. 페이지 라우터 미등록 (페이지 전용)

페이지 파일을 생성해도 라우터에 등록하지 않으면 URL로 접근할 수 없습니다.
구현 완료 후 `src/router/` 또는 `src/App.tsx`에 등록 여부를 반드시 확인하고 안내합니다.
라우터 라이브러리가 아직 없으면 설치 및 설정이 필요함을 안내합니다.

---

## G7. 근접 토큰 대체 판단

디자인 수치가 토큰과 다를 때의 판단 기준:

- 1~2px 차이 → 토큰 사용 (디자인 오차 범위)
- 크게 다름 → `/* TODO: 토큰 없음 - {값} */` 주석 처리
- 고유한 값 → 하드코딩보다 TODO 주석 선호
