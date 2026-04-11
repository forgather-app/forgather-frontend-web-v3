---
name: sync-claude-docs
description: >
  CLAUDE.md와 모든 스킬 파일(.claude/skills/**/SKILL.md, .claude/conventions/*)을
  현재 코드베이스 상태에 맞게 동기화합니다.
  "/sync-claude-docs", "클로드 문서 동기화", "스킬 파일 업데이트", "CLAUDE.md 업데이트",
  "문서 정합성 맞춰줘" 등의 요청에 반드시 사용합니다.
user-invocable: true
---

# 문서 동기화 스킬 (sync-claude-docs)

`CLAUDE.md`, 컨벤션 파일, 스킬 파일들이 현재 코드베이스와 일치하도록 분석하고 업데이트합니다.

---

## ⚠️ Step 0. 토큰 사용 경고 및 동의 확인

이 스킬은 다음 작업을 수행하기 때문에 **토큰 소모가 상당히 큽니다.**

- 모든 스킬 파일 전체 읽기
- CLAUDE.md, 컨벤션 파일 전체 읽기
- 코드베이스 디렉토리 탐색 및 핵심 파일 읽기
- 불일치 항목 분석 및 파일 수정

`AskUserQuestion` 도구로 진행 여부를 확인합니다.

사용자가 **거절**하면 즉시 종료합니다:

```
🛑 동기화를 취소했습니다.
```

---

## Step 1. 문서 파일 전체 수집

아래 파일을 **모두** 읽습니다.

### 1-1. 루트 문서

- `CLAUDE.md`

### 1-2. 컨벤션 파일

```bash
find .claude/conventions -type f -name "*.md"
```

각 파일 전체 읽기.

### 1-3. 스킬 파일

```bash
find .claude/skills -name "SKILL.md"
```

각 파일의 전체 내용 읽기.
읽는 동안 각 파일에서 **코드베이스에 대한 구체적 주장**을 메모합니다.
(디렉토리 경로, 파일 이름, 명령어, 기술 스택 버전, 패키지명 등)

---

## Step 2. 코드베이스 현재 상태 수집

Step 1에서 메모한 주장들을 검증하기 위해 필요한 것만 선택적으로 탐색합니다.

### 2-1. 기본 구조 파악

```bash
# 패키지 및 의존성
cat package.json

# src 디렉토리 구조 (depth 3)
find src -maxdepth 3 -type d | sort

# 주요 설정 파일 목록
ls -1 *.json *.ts *.config.* 2>/dev/null
```

### 2-2. 주장 검증 (필요한 항목만)

Step 1에서 메모한 주장 중 **실제로 틀릴 가능성이 있는 것**만 확인합니다.

| 주장 유형 | 검증 방법 |
|-----------|-----------|
| 디렉토리 존재 여부 | `find <path> -maxdepth 1 -type d` |
| 파일 존재 여부 | `ls <path>` |
| 패키지 버전 | `package.json` 의 dependencies 확인 |
| npm 스크립트 | `package.json` 의 scripts 확인 |
| 컴포넌트 구조 패턴 | 실제 컴포넌트 파일 1~2개 샘플 읽기 |
| 설정 파일 옵션 | 해당 설정 파일 읽기 |

---

## Step 3. 불일치 분석

Step 1과 Step 2를 비교해 불일치 항목을 분류합니다.

### 분류 기준

| 분류 | 설명 | 예시 |
|------|------|------|
| **오류(Error)** | 명백히 틀린 사실 | 존재하지 않는 디렉토리 경로, 없어진 패키지 |
| **구식(Outdated)** | 예전엔 맞았지만 지금은 달라진 것 | 버전 번호, 변경된 스크립트명 |
| **누락(Missing)** | 코드베이스에 있지만 문서에 없는 것 | 새로 생긴 디렉토리, 새 스킬 패턴 |
| **불명확(Ambiguous)** | 코드베이스만 봐서는 판단이 어려운 것 | 의도적인 TODO, 미완성 기능 |

분석 결과를 출력합니다:

```
📊 불일치 분석 결과

파일: CLAUDE.md
  [오류] src/pages 디렉토리가 프로젝트 구조에 언급되어 있으나 실제로는 존재하지 않음
  [구식] React 버전이 18로 기재되어 있으나 package.json 기준 19

파일: .claude/skills/make-ui/SKILL.md
  [누락] src/components/ui/swiperAction 경로가 추가됐으나 예시에 미반영

총 N건: 오류 X | 구식 X | 누락 X | 불명확 X
```

불명확 항목이 있으면 `AskUserQuestion`으로 판단 기준을 확인합니다.
불일치가 없으면 아래 메시지 출력 후 종료:

```
✅ 모든 문서가 코드베이스와 일치합니다.
```

---

## Step 4. 수정 계획 확인

실제 파일 수정 전에 변경 계획을 출력합니다.

```
✏️ 수정 계획

[1/3] CLAUDE.md
  - "src/pages" → "src/pages (미생성)" 또는 삭제
  - React 버전 18 → 19 업데이트

[2/3] .claude/conventions/ui-conventions.md
  - 없음 (변경사항 없음)

[3/3] .claude/skills/make-ui/SKILL.md
  - swiperAction 경로 예시에 추가
```

`AskUserQuestion`으로 수정 진행 여부를 확인합니다.
사용자가 거절하면 계획만 출력하고 종료합니다.

---

## Step 5. 파일 수정 실행

확인된 항목만 순서대로 수정합니다.

- Edit 도구로 **해당 부분만** 정확히 수정 (파일 전체 재작성 금지)
- 수정 의도에서 벗어난 내용은 건드리지 않음
- 불명확 항목은 수정하지 않음

---

## Step 6. 완료 보고

```
✅ 동기화 완료!

수정된 파일 (N개):
  - CLAUDE.md : 2건 수정
  - .claude/skills/make-ui/SKILL.md : 1건 수정

건너뛴 항목 (불명확):
  - ...
```
