# forgather 프로젝트 가이드

미대생을 대상으로 전시 방명록을 작성하고 관리할 수 있는 서비스 forgather의 프론트엔드 프로젝트입니다.

## 기술 스택

### 코어 라이브러리

- **React 19**: UI 라이브러리
- **TypeScript 5.9.3**: 타입 안정성을 위한 정적 타입 시스템
- **Vite 8.x**: 빌드 도구 및 개발 서버

### 스타일링

- **Emotion**: CSS-in-JS 라이브러리

### 라우팅

- **TanStack React Router**: 타입 안전 파일 기반 라우팅
  - `src/routes/`에 라우트 정의 (createFileRoute)
  - `src/pages/`에 실제 페이지 컴포넌트 분리
  - `src/routeTree.gen.ts`: 자동 생성 라우트 트리 (수정 금지)

### 서버 상태 관리

- **TanStack React Query**: 서버 상태 관리 및 데이터 페칭

### API 코드 생성

- **Orval**: OpenAPI 스펙 기반 API 클라이언트 코드 자동 생성
  - React Query 클라이언트 코드 생성
  - `useSuspenseQuery` 기본 사용
  - Custom fetcher (`src/api/customFetcher.ts`) 기반 요청 처리

### 개발 도구

- **Biome**: 린터 및 포맷터 (ESLint + Prettier 대체)
- **vite-plugin-svgr**: SVG 파일을 React 컴포넌트로 변환 (`?react` 쿼리 사용)
- **Storybook 10.x**: 컴포넌트 문서화 및 개발 환경
  - `@storybook/addon-a11y`: 접근성 테스트
  - `@storybook/addon-docs`: 문서화
  - `@storybook/addon-vitest`: 테스트 통합

### 테스팅

- **Vitest 4.x**: 유닛/통합 테스트 프레임워크
- `@vitest/coverage-v8`: 코드 커버리지

## 코딩 컨벤션

### TypeScript 설정

- **Strict Mode**: 모든 strict 옵션 활성화
- **Module System**: ESNext with bundler resolution
- **Target**: ES2022 (app), ES2023 (node)
- **JSX**: react-jsx (React 17+ 새로운 JSX Transform)
- **No Unused Variables**: 사용하지 않는 변수 및 파라미터 금지
- **Verbatim Module Syntax**: import/export 구문 명시적 사용
- **Path Alias**: `@/*` → `src/*` (예: `@/components/...`, `@/styles/...`)

### 코드 포맷팅 (Biome)

- **Indent**: 스페이스 2칸
- **Line Width**: 100자
- **Recommended Rules**: Biome 권장 규칙 활성화

### 컴포넌트 작성 규칙

> 상세 규칙은 `.claude/conventions/ui-conventions.md`를 참조합니다.

- 구현 파일(`Component.tsx`)과 스타일 파일(`Component.styles.ts`) 분리
- 상수·타입이 많을 경우 `Component.constants.ts`로 분리
- Props는 `interface ComponentNameProps`로 정의, JSDoc 주석 필수
- 컴포넌트는 `export default`, 유틸리티/타입은 named export
- 모든 색상·타이포그래피는 `theme` 토큰 사용 (하드코딩 금지)
- ARIA 속성 및 키보드 네비게이션 지원 필수
- UI 컴포넌트는 Storybook 스토리 작성 필수

### 테스팅 규칙

#### 컴포넌트 테스트

컴포넌트는 **인터페이스 기반 개발(Interface-Driven Development)** 원칙을 따릅니다.

1. **Props 인터페이스 우선 정의**
   - 컴포넌트 구현 전에 Props 인터페이스를 먼저 설계
   - 인터페이스가 컴포넌트의 계약(contract) 역할

2. **Storybook을 활용한 시각적 테스트**
   - 모든 Props 조합에 대한 Story 작성
   - 다양한 상태(기본, 로딩, 에러 등)를 Story로 표현
   - Storybook을 컴포넌트의 living documentation으로 활용

3. **접근성 테스트**
   - Storybook의 a11y addon을 통한 자동 접근성 검사
   - 키보드 네비게이션 테스트
   - 스크린 리더 호환성 확인

```typescript
// 1. 먼저 인터페이스 정의
interface ButtonProps {
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

// 2. Storybook으로 모든 케이스 테스트
export const Primary: Story = {
  args: { variant: "primary", size: "medium", children: "Button" },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "medium",
    disabled: true,
    children: "Button",
  },
};

// 3. 인터페이스에 따라 컴포넌트 구현
const Button = ({
  variant,
  size,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  // 구현
};
```

#### 도메인 로직 테스트

도메인 로직(비즈니스 로직, 유틸리티 함수, 훅)은 **TDD(Test-Driven Development)** 방식으로 개발합니다.

**TDD 사이클 (Red-Green-Refactor)**

1. **Red**: 실패하는 테스트 먼저 작성
2. **Green**: 테스트를 통과하는 최소한의 코드 작성
3. **Refactor**: 코드 개선 및 리팩토링

```typescript
// 1. Red - 테스트 먼저 작성 (실패)
// utils/formatDate.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should format date to YYYY-MM-DD", () => {
    const date = new Date("2024-01-15");
    expect(formatDate(date)).toBe("2024-01-15");
  });

  it("should handle invalid date", () => {
    expect(formatDate(null)).toBe("");
  });
});

// 2. Green - 테스트를 통과하는 코드 작성
// utils/formatDate.ts
export const formatDate = (date: Date | null): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 3. Refactor - 필요시 리팩토링
```

#### 테스트 커버리지 목표

- **도메인 로직**: 90% 이상
- **유틸리티 함수**: 100%
- **커스텀 훅**: 80% 이상
- **컴포넌트**: Storybook으로 시각적 커버리지 확보

#### 테스트 실행

```bash
# 테스트 실행
npm run test

# Storybook 테스트 실행
npm run test:storybook
```

## 프로젝트 구조

```
fill-ing/
├── .github/
│   ├── workflows/       # GitHub Actions CI 워크플로우
│   │   ├── ci.yml                    # 타입 체크 및 Biome 린트 (모든 PR)
│   │   ├── label-on-review.yml       # review 라벨 자동 부착
│   │   └── label-good-to-merge.yml   # good to merge 라벨 자동 관리
│   └── ISSUE_TEMPLATE/  # 이슈 템플릿
├── .storybook/          # Storybook 설정
├── public/              # 정적 파일
├── src/
│   ├── api/             # API 관련 코드
│   │   ├── customFetcher.ts  # Orval용 커스텀 fetch 함수
│   │   ├── generated.ts      # Orval 자동 생성 API 클라이언트 (수정 금지, orval 실행 후 생성)
│   │   └── model/            # Orval 자동 생성 타입 모델 (수정 금지, orval 실행 후 생성)
│   ├── assets/          # 이미지, 폰트 등 정적 자산
│   │   └── icons/       # SVG 아이콘 (React 컴포넌트로 임포트)
│   ├── components/      # 컴포넌트
│   │   ├── @common/     # 프로젝트 공통 컴포넌트
│   │   ├── layout/      # 레이아웃 컴포넌트 (Layout.tsx)
│   │   └── ui/          # 재사용 가능한 UI 컴포넌트
│   ├── constants/       # 공통 상수 (레이아웃 제약, 임계값 등)
│   ├── hooks/           # 커스텀 훅
│   │   └── @common/     # 프로젝트 공통 훅
│   ├── pages/           # 페이지 컴포넌트 (라우트 정의 없음, UI만)
│   │   └── MainPage.tsx # 메인 페이지 컴포넌트
│   ├── routes/          # TanStack Router 라우트 정의
│   │   ├── __root.tsx   # 루트 레이아웃 (공통 래퍼)
│   │   └── index.tsx    # / 경로 라우트
│   ├── routeTree.gen.ts # 자동 생성 라우트 트리 (수정 금지)
│   ├── shared/          # 도메인 독립적인 공유 모듈
│   │   └── funnel/      # 퍼널(단계별 입력 플로우) 레이아웃 및 훅
│   ├── stories/         # Storybook 스토리 (컴포넌트 단위)
│   ├── styles/          # 전역 스타일 및 테마
│   │   ├── animations.ts    # 공통 Emotion keyframes 애니메이션
│   │   ├── @common/         # 공통 스타일 컴포넌트 (Backdrop 등)
│   │   ├── theme.ts         # 디자인 토큰 (색상, 타이포그래피, 레이아웃 등)
│   │   ├── GlobalStyle.tsx  # 전역 스타일 컴포넌트
│   │   ├── global.ts        # 전역 CSS
│   │   └── reset.ts         # CSS 리셋
│   ├── types/           # 전역 타입 선언
│   ├── utils/           # 공통 유틸리티 함수
│   ├── App.tsx          # 메인 App 컴포넌트
│   └── main.tsx         # 애플리케이션 엔트리 포인트
├── biome.json           # Biome 설정
├── orval.config.ts      # Orval API 코드 생성 설정
├── tsconfig.json        # TypeScript 루트 설정
├── tsconfig.app.json    # 앱용 TypeScript 설정
├── tsconfig.node.json   # Node용 TypeScript 설정
├── vite.config.ts       # Vite 설정
└── package.json
```

## 디렉토리 역할

### `/src/components/@common`

프로젝트 전반에서 공유되는 공통 컴포넌트를 포함합니다.

### `/src/components/ui`

재사용 가능한 범용 UI 컴포넌트를 포함합니다. 비즈니스 로직이 없는 프레젠테이션 컴포넌트입니다.

**예시**: Button, Input, Modal, Carousel, Layout

### `/src/routes`

TanStack Router의 파일 기반 라우트 정의를 포함합니다. `createFileRoute`로 라우트를 선언하고 실제 컴포넌트는 `src/pages/`에서 import합니다.

- `__root.tsx`: 전체 앱을 감싸는 루트 레이아웃. 공통 UI(헤더, 네비게이션 등)를 여기에 배치합니다.
- `index.tsx`, `about.tsx` 등: 경로별 라우트 파일

### `/src/pages`

페이지 단위 컴포넌트를 포함합니다. 라우트 정의 없이 순수한 React 컴포넌트만 작성합니다.

**예시**: `src/pages/MainPage.tsx`, `src/pages/ExhibitionPage.tsx`

### `/src/shared`

도메인에 독립적이면서 여러 페이지에서 재사용되는 공유 모듈을 포함합니다.
컴포넌트와 훅을 함께 묶어 기능 단위로 관리합니다.

**예시**: `funnel/` (퍼널 레이아웃 `FunnelLayout` + 상태 관리 훅 `useFunnel`)

### `/src/hooks/@common`

프로젝트 전반에서 재사용되는 공통 커스텀 훅을 포함합니다.

**예시**: `useDisclosure` (모달·시트 열림/닫힘 상태 및 애니메이션 관리)

### `/src/constants`

UI 제약값, 임계값 등 프로젝트 공통 상수를 관리합니다.

**예시**: `constraints.ts` (BOTTOM_SHEET_CLOSE_THRESHOLD 등)

### `/src/styles`

전역 스타일, 테마, 디자인 토큰 등을 관리합니다.

<<<<<<< feature/#58-guest-display-card
- `theme.ts`: 색상, 타이포그래피 등 디자인 토큰 정의
- `animations.ts`: 여러 컴포넌트에서 재사용되는 공통 Emotion keyframes
=======
- `animations.ts`: 여러 컴포넌트에서 재사용되는 공통 Emotion keyframes
- `@common/`: Backdrop 등 재사용 가능한 공통 스타일 컴포넌트
- `theme.ts`: 색상, 타이포그래피, 레이아웃(zIndex) 등 디자인 토큰 정의
>>>>>>> develop
- `GlobalStyle.tsx`: 전역 스타일 컴포넌트
- `global.ts`, `reset.ts`: 전역 CSS 및 리셋

## 개발 워크플로우

dev agent와 reviewer agent, 두 에이전트를 활용하여 반복적 개선프로세스를 따름

1. Development (개발)

- 코드 및 테스트 구현
- 프로젝트 규칙과 컨벤션 준수

2. Review (리뷰)

- 테스트 실행
- 코드 품질 체크
- 개선사항 제안

3. Iteration (개선)

- 제안사항 적용
- 재검증
- 최대 3회 시행하며, 3회 시도했음에도 승인되지 않을 경우 문제점을 출력하고 사용자의 응답을 기다림

4. Completion (완료)

- 명시적으로 사용자의 승인을 기다릴 것
- 사용자 확인 없이는 절대 임의로 완료 처리하지 말 것

추가사항

- 매 단계마다 현재 어느 단계에 있는지 출력할 것
- 사용자의 승인이 있을 때까지 작업을 종료하지 말 것

### 설치 및 실행

```bash
npm install
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run storybook    # Storybook 실행
npm run test         # 테스트 실행
```

### 새 컴포넌트 추가

1. 공통 컴포넌트는 `/src/components/@common`에, 페이지 전용 컴포넌트는 `/src/pages/<페이지명>/components`에 폴더 생성
2. `Component.tsx`, `Component.styles.ts` 파일 생성 (상수가 많으면 `Component.constants.ts`도 함께 생성)
3. `src/stories/ComponentName.stories.tsx` 생성 (예: `src/stories/Button.stories.tsx`)
4. Storybook에서 컴포넌트 확인 및 개발
5. 접근성 검사 (a11y addon 활용)

### 코드 품질 관리

```bash
npx @biomejs/biome check .     # 린트 검사
npx @biomejs/biome format .    # 포맷팅
npx @biomejs/biome check --write .  # 자동 수정
```

### Figma 디자인 구현 (MCP 연동)

Figma MCP를 통해 디자인을 코드로 변환할 수 있습니다.

#### URL 형식

```
https://figma.com/design/:fileKey/:fileName?node-id=:nodeId
```

#### 구현 프로세스

1. **Figma URL 제공**: 구현할 컴포넌트의 Figma URL 전달
2. **디자인 컨텍스트 조회**: MCP를 통해 디자인 정보, 스타일, 에셋 URL 추출
3. **컴포넌트 구현**: 프로젝트 컨벤션에 맞게 코드 생성
   - `Component.tsx` + `Component.styles.ts` 분리
   - Emotion styled components 사용
   - 접근성(a11y) 속성 포함
4. **Storybook 스토리 작성**: 다양한 상태의 Story 생성

#### 사용 가능한 MCP 도구

- `get_design_context`: 디자인 정보 및 코드 생성
- `get_screenshot`: 노드 스크린샷 생성
- `get_variable_defs`: 디자인 변수(색상, 폰트 등) 조회
- `get_metadata`: 노드 구조 메타데이터 조회

## 주요 라이브러리 사용법

### Emotion Styled Components

```typescript
import styled from "@emotion/styled";

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 12px 24px;
  background-color: ${({ theme, variant }) =>
    variant === "primary" ? theme.colors.primary : theme.colors.secondary};
`;
```

### Orval (API 코드 생성)

OpenAPI 스펙에서 React Query 훅과 타입을 자동 생성합니다.

```bash
# API 클라이언트 코드 생성
npx orval
```

- **입력**: `https://api.dev.forgather.app/v3/api-docs` (OpenAPI 스펙)
- **출력**: `src/api/generated.ts` (API 훅), `src/api/model/` (타입 모델)
- **주의**: `generated.ts`와 `model/` 디렉토리의 파일은 자동 생성되므로 직접 수정하지 않습니다
- **커스텀 fetcher**: `src/api/customFetcher.ts`에서 fetch 로직을 커스터마이징

```typescript
// 생성된 훅 사용 예시
import { useGetSongs } from "@/api/generated";

const { data } = useGetSongs(); // useSuspenseQuery 기반
```

## 주의사항

1. **모든 컴포넌트는 Storybook을 통해 문서화**되어야 합니다
2. **접근성을 고려**한 마크업과 ARIA 속성 사용
3. **TypeScript strict mode** 준수 - any 타입 사용 지양
4. **Biome 규칙** 준수 - 커밋 전 반드시 검사
5. **컴포넌트 재사용성** 고려 - UI/Domain 분리 원칙
6. **테스트 작성** - Vitest를 통한 컴포넌트 테스트

## 성능 기준

### Lighthouse 측정 항목

- **Performance**: 90점 이상
- **Accessibility**: 90점 이상
- **SEO**: 90점 이상

### 성능 최적화 체크리스트

1. **이미지 최적화**
   - WebP, AVIF 등 최신 포맷 사용
   - 적절한 이미지 크기 및 lazy loading 적용
   - `width`, `height` 속성 명시로 CLS 방지

2. **번들 크기 관리**
   - Code splitting 및 dynamic import 활용
   - Tree shaking으로 사용하지 않는 코드 제거
   - 번들 분석 정기적 수행

3. **렌더링 성능**
   - React.memo, useMemo, useCallback 적절히 활용
   - 불필요한 리렌더링 방지
   - Virtual scrolling 고려 (긴 리스트)

4. **애니메이션 최적화**
   - `transform`, `opacity` 등 GPU 가속 속성 우선 사용
   - `will-change` 속성 신중하게 사용

5. **리소스 로딩**
   - Critical CSS inline 처리
   - 폰트 preload 및 font-display 설정
   - 필수 리소스 우선순위 설정

### 성능 측정 및 모니터링

```bash
# 프로덕션 빌드 성능 확인
npm run build
npm run preview
```

### 성능 저하 방지

- PR 단위로 성능 영향도 검토
- 주요 페이지의 Lighthouse 점수 모니터링
- 성능 저하가 감지되면 즉시 개선 조치

## Git 브랜치 전략

- `develop`: 개발 브랜치
- Feature 브랜치에서 작업 후 develop으로 PR

## Source of Truth

- React behavior should follow the official React documentation.
- TypeScript types should prefer correctness over convenience.
- Styling decisions should align with Emotion’s recommended patterns.
- Server state management should follow TanStack React Query best practices.
- API client code is generated by Orval — do not manually edit generated files.
- Code formatting and linting must follow Biome rules.
- Component structure and stories should align with Storybook conventions.
