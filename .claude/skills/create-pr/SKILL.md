---
name: create-pr
description: >
  현재 브랜치의 커밋을 분석해 Draft PR을 자동으로 생성합니다.
  "/create-pr", "PR 만들어줘", "PR 생성해줘", "풀리퀘 만들어줘", "draft PR 올려줘" 등의 요청에 반드시 사용합니다.
  작업이 끝나고 PR을 올릴 준비가 됐을 때 항상 이 스킬을 사용합니다.
user-invocable: true
---

# Draft PR 생성 스킬 (create-pr)

현재 브랜치의 커밋 내역을 분석해 PR 제목·본문을 자동 작성하고 Draft PR을 생성합니다.

---

## Step 0. 현재 상태 파악

아래 명령어를 **동시에** 실행합니다.

```bash
git branch --show-current          # 현재 브랜치명
git config user.name               # assignee용 사용자명
gh api user --jq .login            # GitHub 로그인 ID (assignee 설정에 사용)
```

### 브랜치명에서 이슈 번호 추출

브랜치명 패턴 예시: `feature/#12-login`, `chore/#5-settings`, `fix/7-bug`

- `#` 뒤의 숫자를 이슈 번호로 추출 (예: `#12` → `12`)
- `#` 없이 숫자만 있는 경우도 허용 (예: `fix/7-bug` → `7`)
- 이슈 번호를 찾지 못하면 Step 1에서 함께 질의

---

## Step 1. 사용자에게 질의

`AskUserQuestion` 도구로 아래 항목을 **한 번에** 물어봅니다.

| 항목 | 옵션 |
|------|------|
| **base 브랜치** | `develop`, `main`, `master`, 직접 입력 |
| **PR prefix** | `feature`, `fix`, `refactor`, `chore`, `style`, `docs`, `test` |
| **이슈 번호** (브랜치명에서 못 찾은 경우만) | 숫자 직접 입력, "없음" 선택 가능 |

이슈 번호를 브랜치명에서 성공적으로 추출했다면 이슈 번호 질문은 생략합니다.

---

## Step 2. 커밋 내역 분석

```bash
git log <base>..HEAD --oneline
git diff <base>...HEAD --stat
```

커밋 목록과 변경 파일 목록을 바탕으로 작업 내용을 파악합니다.
변경사항은 중복 제거 후 핵심 내용만 bullet 3~5개로 요약합니다.

---

## Step 3. PR 제목 작성

형식: `<prefix>: <한 줄 요약>`

- prefix는 Step 1에서 사용자가 선택한 값 사용
- 요약은 커밋 내역을 분석해 Claude가 직접 작성 (사용자에게 묻지 않음)
- 간결하고 명확하게, 한국어로 작성

**예시**
```
feature: 로그인 기능 구현
fix: 장바구니 수량 계산 오류 수정
refactor: API 호출 로직 커스텀 훅으로 분리
```

---

## Step 4. PR 본문 작성

아래 형식을 그대로 사용합니다. 모든 텍스트는 한국어로 작성합니다.

```markdown
## 변경사항 요약

- <변경 항목 1>
- <변경 항목 2>
- <변경 항목 3>

## 스크린샷

<!-- UI 변경사항이 있다면 스크린샷을 첨부해주세요 -->

---

Closes #<이슈번호>
```

### 리스트 작성 규칙 (PR 본문 전체 적용)

PR 본문의 **모든 텍스트 설명은 `-` bullet 리스트로 작성합니다.** 문단(paragraph) 형식은 금지입니다.
변경사항 요약뿐 아니라 스킬 상세 설명, 기타 섹션도 동일하게 적용합니다.

- 각 항목은 **한 줄**로 작성합니다. 줄바꿈·들여쓰기 없이 간결하게.
- 항목 수는 3~5개. 중복·유사한 내용은 하나로 합칩니다.
- 서술형 문장 대신 **"무엇을 → 어떻게"** 패턴으로 작성합니다.

**좋은 예**
```
- 로그인 폼 컴포넌트 신규 추가
- 이메일·비밀번호 유효성 검사 훅 분리
- 인증 실패 시 에러 메시지 표시 처리
```

**나쁜 예** (금지)
```
로그인 기능을 구현했습니다. 사용자가 이메일과 비밀번호를 입력하면 유효성을 검사하고...
여러 가지 변경사항이 있었으며 그 중 주요한 것은...
```

이슈 번호가 없는 경우("없음" 선택 또는 미입력) `Closes #<이슈번호>` 줄은 생략합니다.

---

## Step 5. Draft PR 생성

```bash
gh pr create \
  --title "<PR 제목>" \
  --body "<PR 본문>" \
  --base <base 브랜치> \
  --draft \
  --assignee "<gh 로그인 ID>"
```

- `--draft` 플래그는 항상 포함합니다
- `--assignee`에는 Step 0에서 가져온 GitHub 로그인 ID를 사용합니다
- `gh api user --jq .login` 실패 시 `--assignee` 옵션을 생략합니다

---

## Step 6. 문서 동기화 (sync-docs-with-diff)

PR 생성 완료 후 `sync-docs-with-diff` 스킬을 이어서 실행합니다.
이 때 base 브랜치(Step 1에서 사용자가 선택한 값)를 diff 기준으로 전달합니다.

스킬 내부에서 변경사항과 관련된 문서 업데이트 제안을 생성하고,
반영 여부를 사용자에게 묻습니다.

---

## 완료 출력

PR 생성 성공 시:

```
✅ Draft PR이 생성되었습니다!

제목: feature: 로그인 기능 구현
Base: develop
PR URL: https://github.com/...
```

---

## 에러 처리

| 상황 | 대응 |
|------|------|
| `gh` 미설치 또는 미인증 | `gh auth login` 실행 안내 후 중단 |
| base 브랜치와 diff 없음 | "커밋이 없습니다. 작업 후 다시 시도해주세요." 출력 후 중단 |
| 이미 PR 존재 | 기존 PR URL 안내 후 중단 |
