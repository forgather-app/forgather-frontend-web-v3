# UI 코딩 컨벤션

Fill-ing 프로젝트의 컴포넌트 및 페이지 구현 시 반드시 준수해야 하는 규칙입니다.
컴포넌트·페이지를 구현하는 모든 작업에서 이 파일을 참조합니다.

---

## 1. 파일 구조

모든 컴포넌트/페이지는 구현 파일과 스타일 파일을 분리합니다.

```typescript
// Component.tsx
import * as S from "./Component.styles";

interface ComponentProps {
  /** JSDoc 형식의 Props 설명 */
  propName: string;
  optionalProp?: boolean;
}

const Component = ({ propName, optionalProp = false }: ComponentProps) => {
  return (
    <S.Wrapper>
      {/* 컴포넌트 내용 */}
    </S.Wrapper>
  );
};

export default Component;
```

```typescript
// Component.styles.ts
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  /* 스타일 */
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.heading1 })};
  color: ${({ theme }) => theme.colors.main.purple};
`;
```

---

## 2. 스타일 파일 규칙

- 스타일은 `*.styles.ts` 파일로 분리
- Emotion의 `styled` 사용
- Named export로 스타일 컴포넌트 export
- `* as S` 형태로 import하여 네임스페이스 사용
- **모든 색상·타이포그래피는 `theme` 토큰 사용, 하드코딩 금지**
- 간격 값은 spacing 토큰 도입 전까지 임시 사용 가능
- 토큰에 없는 값은 `/* TODO: 토큰 없음 - {값} */` 주석 처리

### theme 토큰 접근 (중첩 구조 주의)

```typescript
// ❌ 잘못된 접근 — undefined 반환
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

---

## 3. Props 인터페이스

- Props는 항상 `interface`로 정의 (`type` 사용 지양)
- 컴포넌트명 + Props 네이밍: `ComponentNameProps`
- JSDoc 주석으로 각 prop 설명 추가
- Optional props에 기본값 설정

---

## 4. Export 규칙

- 컴포넌트/페이지는 기본 export: `export default ComponentName`
- 유틸리티 함수·타입은 named export 사용 가능

---

## 5. 접근성 (a11y)

- `aria-label`, `aria-hidden` 등 ARIA 속성 적극 활용
- `tabIndex`로 키보드 네비게이션 지원
- `role` 속성으로 의미론적 역할 명시
- 스크린 리더를 위한 텍스트 제공

```typescript
<S.Info tabIndex={0} role="group" aria-label={`곡명 ${songTitle} 아티스트명 ${artist}`}>
  <S.Title aria-hidden={true}>{songTitle}</S.Title>
  <S.Artist aria-hidden={true}>{artist}</S.Artist>
</S.Info>
```

---

## 6. TypeScript 규칙

- Strict mode 준수 — `any` 타입 사용 금지
- Verbatim Module Syntax — import/export 구문 명시적 사용
- 사용하지 않는 변수·파라미터 금지

### EmotionTheme 타입 선언

`theme` 접근 시 TypeScript 오류를 방지하려면 module augmentation이 필요합니다.
`src/types/emotion.d.ts` 파일 존재 여부를 확인하고, 없으면 생성을 제안합니다:

```typescript
// src/types/emotion.d.ts
import "@emotion/react";
import { theme } from "../styles/theme";

type AppTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
```

---

## 7. Biome 규칙

- Indent: 스페이스 2칸
- Line Width: 100자
- 특정 규칙 무시 시 이유 주석 필수:

```typescript
// biome-ignore lint/correctness/useExhaustiveDependencies: 첫 마운트시에만 계산
useEffect(() => {
  // ...
}, []);
```

---

## 8. Storybook 작성 규칙

UI 컴포넌트(`src/components/ui/`, `src/components/@common/`)는 반드시 Storybook 스토리를 작성합니다.
페이지는 선택사항입니다.

```typescript
// src/stories/components/ComponentName.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import Component from "../../components/path/Component";

const meta: Meta<typeof Component> = {
  title: "Component/ComponentName",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    // props
  },
};
```

### Storybook ThemeProvider 설정

`theme`을 사용하는 styled component는 Storybook에서 ThemeProvider가 없으면 오류가 발생합니다.
`.storybook/preview.ts`에 전역 데코레이터를 추가합니다 (전역 설정이므로 각 스토리마다 추가할 필요 없음):

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
  parameters: {
    // 기존 설정 유지
  },
};

export default preview;
```

이 설정이 없으면 Storybook 스토리 작성 전 먼저 추가하거나 사용자에게 안내합니다.
