---
name: make-ui
description: >
  Figma node ID 또는 첨부 이미지를 기반으로 UI를 구현합니다. 컴포넌트와 페이지 단위 개발을 모두 지원합니다.
  "/make-ui", "이 디자인 구현해줘", "Figma 보고 만들어줘", "컴포넌트 만들어줘", "페이지 만들어줘", "화면 구현해줘" 등의 요청에 반드시 사용합니다.
user-invocable: true
---

# 화면 구현 스킬 (make-ui)

---

## 시작 전 필독 (각 1회)

스킬 진입 즉시, 구현을 시작하기 **전에** 아래 두 파일을 읽습니다.
이후 플로우 진행 중에는 다시 열지 않아도 됩니다.

1. `.claude/conventions/ui-conventions.md` — 파일 구조, 스타일, 접근성, Storybook 등 코딩 규칙
2. `.claude/skills/make-ui/references/gotchas.md` — 이 프로젝트에서 반복되는 함정 패턴

---

## Step 0. 입력 확인

Figma node ID(또는 URL)와 첨부 이미지 **둘 다 없으면** 아래 메시지를 출력하고 중단합니다:

```
❌ Figma node ID 또는 이미지가 필요합니다.
`/make-ui 1234:5678` 형태로 node ID를 입력하거나 이미지를 첨부해주세요.
```

Figma URL이 있는 경우 `node-id` 파라미터의 `-`를 `:`으로 변환합니다 (gotchas.md G1 참고).

---

## Step 1. 구현 범위 결정 후 플로우 파일 로드

사용자 요청과 디자인을 보고 모드를 결정합니다:

| 구분 | 특징 | 플로우 파일 |
|------|------|------------|
| **컴포넌트** | 재사용 단위, 독립 동작, 비즈니스 로직 최소화 | `references/component-flow.md` |
| **페이지** | 라우트 대응, 여러 컴포넌트 조합, 데이터 페칭 포함 | `references/page-flow.md` |

모호한 경우 AskUserQuestion으로 확인합니다.
모드가 결정되면 해당 플로우 파일을 읽고 Step 2부터 진행합니다.
