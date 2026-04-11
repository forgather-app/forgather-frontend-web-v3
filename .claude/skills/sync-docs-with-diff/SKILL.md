---
name: sync-docs-with-diff
description: >
  git diff를 기반으로 변경된 코드와 관련된 문서(CLAUDE.md, 스킬 파일, 컨벤션 파일)만 선택적으로 업데이트합니다.
  "/sync-docs-with-diff", "변경사항 기준으로 문서 업데이트", "diff 기반 문서 동기화" 등의 요청에 사용합니다.
  create-pr 스킬 완료 후 자동으로 호출되기도 합니다.
user-invocable: true
---

# 변경사항 기반 문서 동기화 스킬 (sync-docs-with-diff)

전체 코드베이스를 훑는 대신 **git diff로 변경된 파일만** 분석해 관련 문서를 업데이트합니다.
토큰 소모가 적고 PR 단위로 실행하기에 적합합니다.

이 스킬은 두 가지 경로로 진입합니다:

| 진입 경로 | diff 기준 | 비고 |
|-----------|-----------|------|
| 사용자가 직접 `/sync-docs-with-diff` 호출 | `git diff HEAD` (uncommitted 포함) |  |
| `create-pr` 스킬 완료 후 자동 호출 | `git diff <base>...HEAD` | base 브랜치가 인수로 전달됨 |

---

## Step 1. diff 수집

### 직접 호출 시

```bash
git diff HEAD --stat          # 변경 파일 목록
git diff HEAD --unified=0     # 실제 변경 내용 (컨텍스트 0줄)
```

uncommitted 변경이 없으면 최근 커밋 기준으로 fallback:

```bash
git diff HEAD~1..HEAD --stat
git diff HEAD~1..HEAD --unified=0
```

### create-pr에서 호출 시

전달된 base 브랜치 사용:

```bash
git diff <base>...HEAD --stat
git diff <base>...HEAD --unified=0
```

---

## Step 2. 영향받는 문서 판단

diff에서 변경된 파일 목록을 분석해 **업데이트가 필요할 수 있는 문서**를 추론합니다.

| 변경된 파일 패턴 | 확인해야 할 문서 |
|-----------------|----------------|
| `src/components/**` | `CLAUDE.md` (프로젝트 구조), `ui-conventions.md` |
| `src/hooks/**` | `CLAUDE.md` (디렉토리 역할) |
| `src/pages/**` | `CLAUDE.md` (프로젝트 구조) |
| `src/api/**` | `CLAUDE.md` (API 코드 생성 섹션) |
| `package.json` | `CLAUDE.md` (기술 스택, 버전, 스크립트) |
| `*.config.*`, `biome.json`, `tsconfig.*` | `CLAUDE.md` (개발 도구, 설정 섹션) |
| `.claude/skills/**` | 해당 스킬의 SKILL.md 자체 |
| `.storybook/**` | `CLAUDE.md` (Storybook 설정) |

위 패턴에 해당하지 않는 변경이라도 새 디렉토리/파일이 생겼다면 CLAUDE.md 프로젝트 구조를 확인합니다.

---

## Step 3. 관련 문서 읽기

Step 2에서 추려낸 문서 파일만 읽습니다. (전체 훑기 금지)

---

## Step 4. 불일치 분석 및 제안 생성

diff 내용과 문서 내용을 비교해 **업데이트가 필요한 항목**을 찾습니다.

분석 관점:

- 새로 생긴 디렉토리·파일이 문서에 반영되지 않은 경우
- 패키지 버전·스크립트명이 변경됐지만 문서는 구버전인 경우
- 새 패턴(컴포넌트 구조, 훅 사용 방식 등)이 컨벤션 파일에 없는 경우
- 삭제된 경로·기능이 여전히 문서에 남아있는 경우

업데이트가 필요 없으면 출력 후 종료:

```
✅ 변경사항과 관련된 문서는 모두 최신 상태입니다.
```

---

## Step 5. 제안 출력 및 반영 여부 확인

업데이트 제안이 있으면 아래 형식으로 출력합니다:

```
📄 문서 업데이트 제안

[1] CLAUDE.md — 프로젝트 구조
  현재: src/components/ui 하위에 layout, progressbar, swiperAction
  제안: src/components/ui/tooltip 추가 반영

[2] CLAUDE.md — 기술 스택
  현재: React 18
  제안: React 19로 업데이트
```

이후 `AskUserQuestion`으로 반영 여부를 묻습니다.

- **반영**: Step 6으로 이동
- **거절**: 제안 목록만 남기고 종료 (사용자가 나중에 수동 반영 가능)

---

## Step 6. 문서 수정 실행

- Edit 도구로 **해당 부분만** 수정 (파일 전체 재작성 금지)
- 제안 범위를 벗어난 내용은 건드리지 않음

완료 후:

```
✅ 문서 업데이트 완료!

수정된 파일 (N개):
  - CLAUDE.md : 2건 수정
```
