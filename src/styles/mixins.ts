import { css } from "@emotion/react";

/**
 * 사용자가 입력한 콘텐츠(작품 제목·설명, 방명록 메시지, 닉네임 등)를 표시하는
 * 요소에 합성해 텍스트 선택·복사를 허용한다.
 *
 * 전역(`global.ts`)에서 `body`에 `user-select: none`을 걸어 시스템 UI 문구 복사를
 * 막고 있으므로, 사용자 콘텐츠를 렌더링하는 styled component에서만 이 믹스인을
 * 합성해 다시 열어준다.
 */
export const selectableText = css`
  -webkit-user-select: text;
  user-select: text;
  -webkit-touch-callout: default;
`;
