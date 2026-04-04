---
name: make-plan
description: >
  GitHub 이슈 번호를 기반으로 구현 계획(Plan)을 수립합니다.
  "/make-plan #12", "/make-plan 12", "이슈 보고 계획 세워줘", "이슈 분석해서 플랜 만들어줘",
  "기능 구현 계획 세워줘" 등의 요청에 반드시 사용합니다.
  기능 개발 착수 전에 항상 이 스킬로 방향을 잡습니다.
user-invocable: true
---

# 이슈 기반 구현 계획 수립 스킬 (make-plan)

GitHub 이슈 내용과 현재 코드베이스 구조를 분석해 구체적인 구현 계획을 수립합니다.
계획은 `/oh-my-claudecode:omc-plan` 에이전트가 있으면 해당 에이전트에게 위임하고,
없으면 직접 TodoWrite 기반의 구조화된 계획을 출력합니다.

---

## Step 0. 입력 파싱

인수에서 이슈 번호를 추출합니다. 허용 형식: `#12`, `12`.

```
/make-plan #12
/make-plan 12
```

이슈 번호를 파싱하지 못하면 아래 메시지를 출력하고 중단합니다:

```
❌ 이슈 번호가 필요합니다.
`/make-plan #12` 형태로 이슈 번호를 입력해주세요.
```

---

## Step 1. 이슈 내용 가져오기

```bash
gh issue view <number> --json title,body,labels,assignees,milestone
```

실패(원격 저장소 미연결, 권한 부족 등)하면:

```
⚠️ GitHub 이슈를 불러오지 못했습니다. 이슈 내용을 직접 붙여넣어 주세요.
```

라고 출력 후, 사용자가 내용을 제공할 때까지 대기합니다.

---

## Step 2. 코드베이스 컨텍스트 수집

이슈 제목·본문을 분석해 관련 키워드(기능명, 컴포넌트명, 도메인 용어)를 뽑은 뒤,
아래 순서대로 컨텍스트를 수집합니다.

### 2-1. 컨벤션 파일 읽기 (각 1회)

- `.claude/conventions/ui-conventions.md` — 파일 구조, 스타일, 접근성 규칙
- `CLAUDE.md` — 이미 컨텍스트에 있으면 skip

### 2-2. 디렉토리 구조 파악

```bash
# src 하위 폴더 목록 (depth 2)
find src -maxdepth 2 -type d | sort
```

### 2-3. 관련 기존 패턴 탐색

이슈에서 추출한 키워드로 다음을 탐색합니다:

| 탐색 목적 | 방법 |
|-----------|------|
| 유사 컴포넌트 파일 찾기 | `Glob("src/components/**/*.tsx")` + 키워드 필터 |
| 기존 훅/유틸 찾기 | `Grep(pattern=<keyword>, path="src/hooks")` |
| 기존 페이지 파일 찾기 | `Glob("src/pages/**/*.tsx")` |
| 스타일 토큰 확인 | `Read("src/styles/theme.ts")` (없으면 skip) |
| API 훅 확인 | `Grep(pattern=<keyword>, path="src/api")` |

탐색 결과에서 구현에 **직접 참고할 파일** 2~3개를 선별해 읽어둡니다.
이미 유사한 컴포넌트가 있다면 재사용 가능성을 메모합니다.

---

## Step 3. 계획 수립 — omc-plan 우선, 직접 작성 폴백

### 3-A. `/oh-my-claudecode:omc-plan` 이 설치된 경우

아래 컨텍스트를 담아 스킬을 호출합니다:

```
이슈 제목: <title>
이슈 본문:
<body>

라벨: <labels>
마일스톤: <milestone>

---

## 관련 코드 컨텍스트

### 디렉토리 구조
<find 결과>

### 참고할 기존 파일
<선별한 파일 경로 및 핵심 내용 요약>

### 프로젝트 컨벤션 요약
- 컴포넌트: Component.tsx + Component.styles.ts 분리, Emotion styled-components
- Props: interface ComponentNameProps, JSDoc 주석 필수
- 테마: theme 토큰 사용, 하드코딩 금지
- 접근성: ARIA 속성, 키보드 네비게이션 필수
- 스토리: Storybook 스토리 작성 필수
- 서버 상태: TanStack React Query (useSuspenseQuery 기본)
- API: Orval 자동 생성 훅 사용 (generated.ts 직접 수정 금지)
- 테스트: 도메인 로직 TDD, 컴포넌트는 Storybook 시각적 테스트
```

### 3-B. omc-plan을 사용할 수 없는 경우

직접 구조화된 계획을 작성합니다. 아래 형식을 따릅니다:

---

**[구현 계획] <이슈 제목>**

## 📋 이슈 요약
<2~3줄 요약>

## 🗂️ 영향 범위 분석
- **신규 생성**: (파일 목록)
- **수정 필요**: (파일 목록 및 이유)
- **재사용 가능**: (기존 컴포넌트/훅 목록)

## 🔢 구현 순서

### 1단계: 타입 & 인터페이스 정의
- [ ] `src/types/` 또는 컴포넌트 Props 인터페이스 작성

### 2단계: API 연동 (필요 시)
- [ ] Orval 생성 훅 확인 (`src/api/generated.ts`)
- [ ] 없으면 `npx orval` 실행 후 확인

### 3단계: 도메인 로직 / 커스텀 훅
- [ ] `src/hooks/` 또는 `src/utils/`에 비즈니스 로직 분리
- [ ] TDD: 테스트 파일 먼저 작성

### 4단계: UI 컴포넌트 구현
- [ ] `Component.tsx` + `Component.styles.ts` 분리 생성
- [ ] 접근성(ARIA, 키보드 네비게이션) 적용

### 5단계: Storybook 스토리 작성
- [ ] `src/stories/components/Component.stories.tsx` 생성
- [ ] 모든 Props 조합 + 상태별 Story 작성

### 6단계: 페이지/라우터 연결 (필요 시)
- [ ] `src/pages/` 파일 수정 또는 생성
- [ ] `src/router/` 라우트 등록

### 7단계: 검증
- [ ] `npm run test` 통과
- [ ] `npx @biomejs/biome check .` 통과
- [ ] Storybook 시각적 확인

## ⚠️ 주의사항 / 알려진 함정
<코드베이스 탐색에서 발견한 특이사항이나 주의할 점>

## 🔗 참고 파일
<탐색 중 선별한 파일 경로 목록>

---

계획 출력 후, **사용자의 승인을 명시적으로 기다립니다.**
승인 없이 구현에 착수하지 않습니다.
