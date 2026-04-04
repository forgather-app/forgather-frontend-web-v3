# 컴포넌트 구현 플로우

`make-ui` 스킬의 컴포넌트 모드 단계별 지침입니다.
이 파일을 읽기 전에 `ui-conventions.md`와 `gotchas.md`를 이미 읽었다고 가정합니다.

---

## Step 2. 디자인 파악

### Figma node ID가 있는 경우

`figma:figma-implement-design` 스킬을 활용합니다.
Figma MCP(`get_design_context`)로 노드 정보를 가져와 다음을 파악합니다:

- 컴포넌트명 및 역할
- 레이아웃 구조 (flex, grid, 중첩 관계)
- 크기, 간격, 패딩, 마진 수치
- 색상, 타이포그래피, 테두리 등 스타일 값
- 인터랙티브 요소 (버튼, 입력, 토글 등)
- 반복 패턴 (리스트, 카드 등)

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

## Step 4. 기존 컴포넌트 탐색

**탐색 위치:**
- `src/components/ui/` — 범용 UI 컴포넌트
- `src/components/domain/` — 도메인 컴포넌트
- `src/components/@common/` — 공통 컴포넌트

각 파일의 props 인터페이스를 확인하고, 재사용 가능한 컴포넌트와 사용법을 기록합니다.

---

## Step 5. 컴포넌트 구현

저장 위치: `src/components/{ui | domain}/{ComponentName}/`

### 파일 구조

```typescript
// ComponentName.tsx
import * as S from "./ComponentName.styles";

interface ComponentNameProps {
  /** prop 설명 */
  propName: string;
  optionalProp?: boolean;
}

const ComponentName = ({ propName, optionalProp = false }: ComponentNameProps) => {
  return (
    <S.Wrapper>
      {/* 내용 */}
    </S.Wrapper>
  );
};

export default ComponentName;
```

```typescript
// ComponentName.styles.ts
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  /* 스타일 */
`;
```

### 대응 컴포넌트 없는 영역

```tsx
{/* TODO: [AreaName] - 구현 필요 */}
<S.AreaNamePlaceholder>[AreaName] 영역</S.AreaNamePlaceholder>
```

```typescript
export const AreaNamePlaceholder = styled.div`
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

## Step 6. Storybook 스토리 작성

`src/stories/components/{ComponentName}.stories.tsx`를 생성합니다.

- Props의 주요 조합 + 엣지 케이스(disabled, loading, error 등) Story 작성
- `.storybook/preview.ts`에 ThemeProvider 데코레이터 설정 여부 먼저 확인 (gotchas.md G3)

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import ComponentName from "../../components/path/ComponentName";

const meta: Meta<typeof ComponentName> = {
  title: "Component/ComponentName",
  component: ComponentName,
};

export default meta;

type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: { /* props */ },
};
```

---

## Step 7. 완료 보고

```
✅ 컴포넌트 구현 완료

📁 생성된 파일:
  - {파일 경로}

♻️ 재사용된 컴포넌트:
  - {컴포넌트명} ({출처})

⚠️ Placeholder 처리된 영역 ({N}개):   ← 없으면 생략
  - [{AreaName}] — {이유}

🎨 토큰 미매핑 항목:
  - {항목} 또는 없음

📌 추가 확인 필요:   ← 해당 항목만 표시
  - EmotionTheme 타입 선언 미설정 (`src/types/emotion.d.ts`)
  - Storybook ThemeProvider 미설정 (`.storybook/preview.ts`)
```
