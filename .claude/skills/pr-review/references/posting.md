# PR 리뷰 제출 (`--post`)

`pr-review` Step 7 리포트를 GitHub PR에 남기는 방법입니다.

## 먼저 정할 것: 내 PR인가, 남의 PR인가

```bash
gh api user --jq .login
```

PR 작성자는 Step 0에서 받은 `author.login`을 씁니다.

두 값이 같으면 **셀프 리뷰**입니다. `create-pr`가 자동으로 부르는 경우가 항상 이쪽입니다.

이 구분이 필요한 이유는 `.github/workflows/label-good-to-merge.yml` 때문입니다. 이 워크플로는 PR에 달린 리뷰를 사람별 최신 상태로 모아서 **전부 `APPROVED`일 때만** `good to merge` 라벨을 붙입니다. PR 작성자가 자기 PR에 `COMMENT` 리뷰를 남기면 그 사람의 최신 상태가 `COMMENTED`로 남고, 작성자는 자기 PR을 승인할 수 없으니 **`good to merge`가 영영 붙지 않습니다.**

| 경우 | 남기는 방식 | 인라인 코멘트 |
| --- | --- | --- |
| 셀프 리뷰 | `gh pr comment`로 일반 PR 코멘트 1개 | 없음. 지적마다 `path:line`을 본문에 적어 대신함 |
| 남의 PR | `gh api .../reviews`로 `COMMENT` 리뷰 | CRITICAL·HIGH·MEDIUM 중 diff 줄에 붙일 수 있는 것 |

(`label-on-review.yml`은 PR 작성자 본인의 리뷰·코멘트를 이미 걸러 내므로, 셀프 리뷰로는 `review` 라벨이 붙지 않습니다. 남의 PR에 리뷰를 남기면 `review` 라벨이 붙는 게 정상입니다.)

남의 PR에 남긴 `COMMENT` 리뷰도 `good to merge`를 막지만, 리뷰한 사람이 나중에 승인하면 최신 상태가 `APPROVED`로 바뀌니 문제없습니다.

## 남는 것

1. **보고서 본문** — Step 7 리포트를 심각도별 보고서로 정리한 것. CRITICAL·HIGH·MEDIUM·LOW **전부** 들어갑니다. 작성자가 PR 화면 한곳에서 전체 지적을 훑을 수 있게 하려는 것입니다.
2. **인라인 코멘트** (남의 PR일 때만) — CRITICAL·HIGH·MEDIUM 중 diff 줄에 붙일 수 있는 이슈. LOW는 줄마다 달면 소음이 되니 본문에만 둡니다. 특정 줄이 없는 이슈(기획 누락 등)도 본문에만 둡니다.

## 보고서 본문 형식

```markdown
## 🤖 PR 리뷰

**노션**: {페이지 제목} / 없음 / 읽지 못함 · **이슈**: #{N} / 없음 · **Figma**: {N}개 노드 / 없음
**요약**: 🔴 CRITICAL N · 🟠 HIGH N · 🟡 MEDIUM N · ⚪ LOW N

### 기획·본문·이슈 대조
{Step 1 매핑 표}

**본문에 없는 변경**: {목록 / 없음}

### 🔴 CRITICAL
#### [단계] 제목
- **파일**: `path:line`
- **문제**:
- **재현 가능성**: … — 근거
- **재현 경로**: 1. 사전 조건 … 2. 진입 … 3. 조작 … 4. 기대 / 실제
- **수정 제안**:

### 🟠 HIGH
(같은 형식)

### 🟡 MEDIUM
(같은 형식)

### ⚪ LOW
- [단계] 제목 — `path:line` 한 줄 설명과 수정 제안

### 확인한 범위
- 회귀: {검토한 삭제·변경 동작 수}, 의도된 동작 변경 {목록 / 없음}
- 디자인: {확인 / 생략 사유}

### 사용자 확인 필요
- …
```

- 해당 심각도에 이슈가 없으면 그 섹션은 `### 🟠 HIGH` 아래에 `없음` 한 줄만 둡니다. 섹션을 지우지 않아야 "확인했는데 없음"이 보입니다.
- 인라인으로도 단 이슈는 본문에서 줄이지 않고 그대로 둡니다. 인라인 코멘트는 접히거나 outdated가 되면 안 보이기 때문입니다.
- 재현 가능성·재현 경로는 회귀·버그·화면에 보이는 디자인 이슈에만 적습니다.

## 제출 — 셀프 리뷰

보고서 본문을 스크래치 디렉토리에 마크다운으로 쓰고 그대로 올립니다.

```bash
gh pr comment {PR} --body-file {스크래치}/pr-review-body.md
```

## 제출 — 남의 PR

```bash
gh repo view --json owner,name --jq '"\(.owner.login)/\(.name)"'
```

요청 본문은 스크래치 디렉토리에 JSON으로 쓰고 `--input`으로 넘깁니다. 본문 마크다운을 JSON 문자열로 직접 이스케이프하다 깨지기 쉬우니, 마크다운을 파일로 쓴 뒤 `jq`로 감쌉니다.

```bash
jq -n --arg body "$(cat {스크래치}/pr-review-body.md)" --arg sha "{headRefOid}" \
  --slurpfile comments {스크래치}/pr-review-comments.json \
  '{commit_id: $sha, body: $body, event: "COMMENT", comments: $comments[0]}' \
  > {스크래치}/pr-review.json
```

`pr-review-comments.json`은 인라인 코멘트 배열입니다. 없으면 `[]`.

```json
[
  { "path": "src/pages/...", "line": 42, "side": "RIGHT", "body": "**🟠 HIGH [버그]** 제목\n\n**문제**: …\n\n**수정 제안**: …" }
]
```

```bash
gh api repos/{owner}/{repo}/pulls/{PR}/reviews --method POST --input {스크래치}/pr-review.json
```

- (남의 PR) `event`는 항상 `COMMENT`입니다. 승인·변경 요청은 사람이 정합니다. 이 레포는 리뷰가 달리면 `review` 라벨, 전원 승인 시 `good to merge` 라벨을 워크플로가 붙이므로, 봇 리뷰가 승인 흐름을 건드리지 않게 합니다.
- 증상은 diff 밖 파일에서 나지만 원인이 diff 안에 있으면, **원인 줄**에 인라인 코멘트를 답니다.
- `line`은 diff에 포함된 새 파일 기준 줄 번호. 삭제된 줄이면 `side: "LEFT"`. diff 밖 줄을 지정하면 API가 리뷰 전체를 422로 거절하니, 애매한 이슈는 인라인에서 빼고 본문에만 둡니다.
- 지적할 이슈가 0건이어도 대조 표와 "확인한 범위", 각 심각도 `없음`을 담아 제출합니다 (셀프 리뷰는 코멘트, 남의 PR은 body만 있는 리뷰). 작성자가 무엇을 확인받았는지 PR에서 볼 수 있게 하려는 것입니다.
- `create-pr` 스킬이 PR을 만든 직후 이 스킬을 `--post`로 자동 호출합니다. 이때는 리포트 전문을 대화에 다시 붙이지 말고, 심각도별 건수와 CRITICAL·HIGH 제목만 짧게 보여 줍니다. 전문은 PR에 있습니다.
