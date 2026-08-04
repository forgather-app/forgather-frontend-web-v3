import { css } from "@emotion/react";

export const global = css`
  :root {
    /* SwiperAction 이식을 위해 추가. theme.layout.sidePadding(16)과 동일하게 유지 */
    --layout-padding-x: 16px;
  }
  * {
    box-sizing: border-box;
    font-family: inherit;
    font-synthesis: none;
  }
  body {
    font-family: 'SUIT', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
    background-color: #f5f5f5;
    word-break: break-all;
  }
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  html {
    scroll-behavior: smooth;
  }
  input {
    &:focus {
      border: none;
      outline: none;
    }
  }
  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    &:disabled {
      cursor: default;
    }
  }
  textarea {
    resize: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
  .scroll-lock {
    overflow: hidden;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    overscroll-behavior: none;
    touch-action: none;
  }
`;
