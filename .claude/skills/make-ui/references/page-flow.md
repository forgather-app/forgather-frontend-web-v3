# 페이지 구현 플로우

`make-ui` 스킬의 페이지 모드 단계별 지침입니다.
이 파일을 읽기 전에 `ui-conventions.md`와 `gotchas.md`를 이미 읽었다고 가정합니다.

---

## Step 2. 디자인 파악

### Figma node ID가 있는 경우

`figma:figma-implement-design` 스킬을 활용합니다.
Figma MCP(`get_design_context`)로 노드 정보를 가져와 다음을 파악합니다:

- 페이지명 및 역할 (어떤 URL에 대응하는지)
- 레이아웃 구조 (헤더, 컨텐츠, 푸터, 사이드바 등 섹션)
- 각 섹션의 크기, 간격, 스타일 값
- 인터랙티브 요소 및 상태 변화 (모달, 탭, 필터 등)
- 데이터 페칭이 필요한 영역 (리스트, 카드 등 동적 컨텐츠)
- 스크롤 동작 및 반응형 처리 필요 여부

### 이미지가 있는 경우

이미지를 분석하여 동일한 항목을 파악합니다.

결과는 내부적으로만 기록하고 사용자에게 출력하지 않습니다.

---

## Step 3. 디자인 토큰 매핑

`src/styles/theme.ts`를 읽어 디자인 수치를 토큰에 매핑합니다.

**판단 기준:**
- 1~2px 차이 → 토큰 사용
- 크게 다름 → `/* TODO: 토큰 없음 - {값} */` 주석 처리

---

## Step 4. 기존 리소스 탐색

**탐색 위치:**
- `src/components/ui/` — 범용 UI 컴포넌트
- `src/components/domain/` — 도메인 컴포넌트
- `src/components/@common/` — 공통 컴포넌트
- `src/pages/` — 기존 페이지 패턴 참조 (있는 경우)
- `src/router/` 또는 `src/App.tsx` — 라우터 구조 파악

각 파일의 props 인터페이스를 확인하고, 재사용 가능한 컴포넌트와 사용법을 기록합니다.

---

## Step 5. 페이지 구현

저장 위치: `src/pages/{PageName}/`

### 기본 파일 구조

```typescript
// PageName.tsx
import { Suspense } from "react";
import * as S from "./PageName.styles";
import ComponentA from "@/components/domain/ComponentA";

const PageName = () => {
  return (
    <S.PageWrapper>
      <S.Header>...</S.Header>
      <S.Content>
        <Suspense fallback={<div>로딩 중...</div>}>
          <ComponentA />
        </Suspense>
      </S.Content>
    </S.PageWrapper>
  );
};

export default PageName;
```

```typescript
// PageName.styles.ts
import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  /* 헤더 스타일 */
`;

export const Content = styled.main`
  flex: 1;
`;
```

### 데이터 페칭이 있는 경우

Orval 기본 설정이 `useSuspenseQuery`이므로 반드시 Suspense + ErrorBoundary가 필요합니다 (gotchas.md G5):

```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <Suspense fallback={<LoadingSpinner />}>
    <DataFetchingComponent />
  </Suspense>
</ErrorBoundary>
```

### 대응 컴포넌트 없는 섹션

```tsx
{/* TODO: [SectionName] - 구현 필요 */}
<S.SectionNamePlaceholder>[SectionName] 영역</S.SectionNamePlaceholder>
```

```typescript
export const SectionNamePlaceholder = styled.div`
  width: 100%;
  min-height: 48px;
  border: 1px dashed ${({ theme }) => theme.colors.gray.gray200};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray.gray300};
  ${({ theme }) => ({ ...theme.typography.caption })};
`;
```

---

## Step 6. 라우터 등록 안내

`src/router/` 또는 `src/App.tsx`를 확인하고 등록 방법을 안내합니다 (gotchas.md G6).

**라우터가 있는 경우** — 해당 파일에 직접 추가:

```typescript
// React Router 예시
{ path: "/route-path", element: <PageName /> }
```

**라우터가 없는 경우** — 라우터 라이브러리 설치 및 설정이 필요함을 사용자에게 안내합니다.

---

## Step 7. 완료 보고

```
✅ 페이지 구현 완료

📁 생성된 파일:
  - {파일 경로}

♻️ 재사용된 컴포넌트:
  - {컴포넌트명} ({출처})

⚠️ Placeholder 처리된 섹션 ({N}개):   ← 없으면 생략
  - [{SectionName}] — {이유}

🎨 토큰 미매핑 항목:
  - {항목} 또는 없음

📌 추가 작업 필요:
  - 라우터 등록: {경로} → {등록 파일}
  - Suspense/ErrorBoundary 래퍼 확인 (데이터 페칭 영역)
  - EmotionTheme 타입 선언 미설정 (`src/types/emotion.d.ts`)   ← 미설정 시만
```
